import { createServer } from "http";
import { v4 as uuidv4 } from "uuid";
import { parseRequestBody } from "./utils/parseBody.js";

let users = [];

const server = createServer(async (req, res) => {
  const { method, url } = req;
  switch (method) {
    case "GET":
      if (url === "/api/users") {
        res.writeHead(200, {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=3600",
        });
        res.end(JSON.stringify({ data: users }));
        break;
      } else if (url.startsWith("/api/users/") && url.endsWith("/hobbies")) {
        const userIdHobbies = url.split("/")[3];
        const userHobbies = users.find((user) => user.id === userIdHobbies);
        if (!userHobbies) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "User not found" }));
        } else {
          res.writeHead(200, {
            "Content-Type": "application/json",
            "Cache-Control": "private, max-age=3600",
          });
          res.end(JSON.stringify({ data: userHobbies.hobbies }));
        }
        break;
      }
    case "POST":
      if (url === "/api/users") {
        const { name, email } = await parseRequestBody(req);
        if (!name || !email) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              data: "You didn't specify the email or the user name",
            })
          );
          break;
        }
        const id = uuidv4();
        const links = [
          { rel: "hobbies", href: `/api/users/${id}/hobbies` },
          { rel: "self", href: `/api/users/${id}` },
        ];
        const user = { id, name, email, hobbies: [], links };
        users.push(user);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ data: user }));
        break;
      }
    case "DELETE":
      if (url.startsWith("/api/users")) {
        const userId = url.split("/")[3];
        const user = users.find((user) => user.id === userId);
        if (!user) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "User not found" }));
          break;
        }
        users = users.filter((user) => user.id !== userId);
        res.writeHead(204);
        res.end();
        break;
      }
    case "PATCH":
      if (url.startsWith("/api/users/") && url.endsWith("/hobbies")) {
        const userIdPatch = url.split("/")[3];
        const user = users.find((user) => user.id === userIdPatch);
        if (!user) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "User not found" }));
          break;
        }
        const { hobbies } = await parseRequestBody(req);
        const sortedHobbies = hobbies.filter(
          (hobby) => !user.hobbies.includes(hobby)
        );
        user.hobbies = [...user.hobbies, ...sortedHobbies];
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ data: user }));
        break;
      }
    default:
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Route ${url} doesn't exist` }));
      break;
  }
});

server.listen(8000);
