import { Context } from "graphql-yoga/dist/types";
import redisClient from "../redis/redis";
import  { promisify } from  "util";
const getAsync = promisify(redisClient.get).bind(redisClient);

type Query = {
    annotations(parent: Parent, args: {[key: string]: number | string}, context: Context) : Promise<Annotations>
    activeSessions(parent: Parent, args: {[key: string]: number | string}, context: Context) : Promise<ActiveSessionsObj[] | null>
}


const Query: Query = {
    annotations: async (parent, args, context) => {
        const offset:number = args.page as number - 1;
        const count: number = await context.prisma.annotation.count({
            where:{
                accountId: args.accountId
            }
        })
        const pageCount: number = Math.floor(count / 10) ;
        let nextPage: number | null = null;
        if (pageCount > (args.page as number)) nextPage = args.page as number + 1;

        const annotations:Annotation[] = await context.prisma.annotation.findMany({
            where :{
                accountId: args.accountId
            },
            take: 10,
            skip: offset > 0 ? offset * 10 : 0,
        });
        return {annotations, nextPage}
    },
    activeSessions: async (parent, args, context) => {
        const sessions = await getAsync("activeSessions");
        if(sessions) {
            const sessionsArray: string[] = JSON.parse(sessions);
            const filteredSessionsArray = sessionsArray.filter((sessionId: string) => {
                return sessionId.endsWith(args.accountId.toString());
            })
            const multi = redisClient.multi();
            filteredSessionsArray.forEach(sessionId => {
                multi.get(sessionId);
            })
            let response: string[] | null;
            const execAsync = promisify(multi.exec).bind(multi);
            response = await execAsync();
            return response.forEach(obj => JSON.parse(obj)) as unknown as  ActiveSessionsObj[];
        }
        return null
    }
}

export default Query;