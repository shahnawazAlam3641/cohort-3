import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// interface CreateUser {
//   firstname: string;
//   lastname: string;
//   email: string;
//   password: string;
// }

// interface CreateUser {
//     firstname: string;
//     lastname: string;
//     email: string;
//     password: string;
//   }

async function main() {
  //   const user = await prisma.user.create({
  //     data: {
  //       firstname: "irfan",
  //       email: " irfan@gmail.com",
  //       password: "params.password",
  //       lastname: "params.lastname",
  //     },
  //   });

  //   const user = await prisma.user.update({
  //     where: {
  //       email: "irfan",
  //     },
  //     data: {
  //       email: "irfan@gmail.com",
  //       lastname: "jan",
  //       password: "janu1234",
  //     },
  //   });

  //   const user = await prisma.user.delete({
  //     where: { email: "irfan@gmail.com" },
  //   });

  //   const user = await prisma.user.findUnique({ where: { id: 1 } });

  //   console.log(user);

  //   const todo = await prisma.todo.createMany({
  //     data: [
  //       { title: "eat", userId: 2 },
  //       { title: "sleep", userId: 2 },
  //       { title: "repeat", userId: 2 },
  //     ],
  //   });

  //   const todo = await prisma.todo.findMany({
  //     where: { userId: 1 },
  //     select: { user: true, title: true, done: true },
  //   });

  const todo = await prisma.todo.deleteMany({ where: { userId: 2 } });

  console.log(todo);
}

main().catch((e) => console.log("Error", e));

// async function updateUser(params: User) {
//   const user = await prisma.user.create({
//     data: {
//       firstname: params.firstname,
//       email: params.email,
//       password: params.password,
//       lastname: params.lastname,
//     },
//   });
//   console.log(user);
// }

// try {
//   insertUser({
//     firstname: "shah",
//     lastname: "nawaz",
//     email: "shah@alam.com",
//     password: "shah1234",
//   });
// } catch (error) {
//   console.log("errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
//   console.log(error);
// }
