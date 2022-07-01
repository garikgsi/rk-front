import store from "@/store";
import { apiPost } from "../requestApi";

// check if existed saved token in localStorage and use it
const inviteParent = async ({ name, email, parentId }) => {
  const data = new FormData();
  data.append("name", name);
  data.append("email", email);
  data.append("parent_id", parentId);
  // request invite
  const userResponse = await apiPost({ url: "auth/invite", data });
  const { data: userData, code: code } = userResponse;
  // associate parent with user
  const inviteError = await store.dispatch("parents/associateWithUser", {
    id: parentId,
    userId: userData.id,
  });
  return { isError: inviteError, code: code };
};

export { inviteParent };
