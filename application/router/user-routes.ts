import { FastifyInstanceZod } from "@/@types/fastify-instance-zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { UserDto } from "../http/dto/user-dto";
import { User } from "@/domain/entities-pg/user.entity";

export function userRouter(app: FastifyInstanceZod) {
  const userTags = ["Users"]
  app.register((instance, opts, done) => {
    instance.withTypeProvider<ZodTypeProvider>()
      .post(
        "/signIn",
        {
          schema: {
            body: UserDto.signIn,
            tags: userTags
          }
        },
        async (req, reply) => {
          const payload = await instance.userService.signIn(req.body);
          return reply.status(200).send({ payload, message: "User loggon", statusCode: 200 });
        }
      )
    instance.withTypeProvider<ZodTypeProvider>().post(
      "/signUp",
      {
        schema: {
          body: UserDto.signUp,
          tags: userTags
        }
      },
      async (req, reply) => {
        const user = await instance.userService.signUp(req.body) as unknown as User;
        return reply.status(201).send({
          data: { name: user.name, email: user.email, avatar: user.avatar },
          statusCode: 201,
          message: "User registered with success"
        })
      }
    )
    done()
  }, { prefix : "users"})
}