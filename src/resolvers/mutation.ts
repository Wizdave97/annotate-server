import { Context } from 'graphql-yoga/dist/types';


type Mutation = {
    [key: string]: (parent: Parent, args: {[key: string]: number | string}, context: Context, info: any) => any
}
const Mutation: Mutation = {
        createAnnotation: async (parent: Parent, args: {[key: string]: number | string}, context: Context, info: any) => {
            const annotation: Annotation = {
                sessionId: <string>args.sessionId,
                annotation: <string>args.annotation,
                accountId: <number>args.accountId
            }
            const check: Annotation[] | [] = await context.prisma.annotation.findMany({
                where: {
                    sessionId: args.sessionId,
                    accountId: args.accountId
                }
            })
            let newAnnotation:Annotation;
            if(check && check.length > 0) {
                
                newAnnotation = await context.prisma.annotation.update(
                    {
                        where: {
                            id: check[0].id
                        },
                        data: {
                                ...annotation
                        }
                    }
                )
            }
            else {
                newAnnotation = await context.prisma.annotation.create({
                    data:{
                        ...annotation
                    }
                })
            }
            
             
            return newAnnotation;
        },
}

export default Mutation