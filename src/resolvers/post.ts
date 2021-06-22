import { Post } from "../entities/Post";
import { MyContext } from "src/types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  postQ(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  postQ1(
    @Arg("identifier", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    return em.findOne(Post, { id });
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("title", () => String) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post> {
      const post =  em.create(Post, { title });
      await em.persistAndFlush(post);
      return post;
  }

  @Mutation(() => Post, { nullable: true})
  async updatePost(
    @Arg("identifier") id: number,  
    @Arg("title", () => String, { nullable: true }) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
      const post = await em.findOne(Post, { id });
      if(!post){
        return null
      }
      if(typeof title !== 'undefined'){
          post.title = title
          await em.persistAndFlush(post)
      }
      return post;
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg("identifier") id: number,  
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
      await em.nativeDelete(Post, { id });
      return true;
  }
}
