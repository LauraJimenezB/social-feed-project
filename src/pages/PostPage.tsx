import { Heading } from "@radix-ui/themes";
import PageLayout from "../components/layout/PageLayout";
import PostForm from "../components/post-form/PostForm";

const PostPage = () => {
  return (
    <PageLayout>
      <Heading size="7">Crear publicación</Heading>
      <PostForm />
    </PageLayout>
  );
};

export default PostPage;
