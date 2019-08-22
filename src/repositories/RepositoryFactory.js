import UsersRepository from "./UsersRepository";
import TagsRepository from "./TagsRepository";
import PostsRepository from "./PostsRepository";

const repositories = {
  users: UsersRepository,
  tags: TagsRepository,
  posts: PostsRepository
};

export default {
  get: name => repositories[name]
};
