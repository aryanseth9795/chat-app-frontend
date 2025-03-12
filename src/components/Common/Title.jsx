

import { Helmet } from "react-helmet-async";

export default function Title({
  title = "ChatsApp",
  desc = "This is chat app made by Aryan Seth",
}) {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc} />
      </Helmet>
    </div>
  );
}
