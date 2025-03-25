interface IBase {
  name?: string;
  image?: string;
}

interface IStudent extends IBase {
  description: string;
}

interface IChat extends IBase {
  text: string;
  role: "student" | "sensei";
}

const createStudent = (name: string, description: string, isBunny: boolean): IStudent => ({
  name,
  image: isBunny ? `/${name}_(Bunny_Girl).png` : `/${name}.png`,
  description,
});

const createChat = (
  name: string,
  text: string,
  role: "student" | "sensei",
  isBunny?: boolean,
): IChat => ({
  image: isBunny ? `/${name}_(Bunny_Girl).png` : `/${name}.png`,
  name,
  text,
  role,
});

const studentData = [
  {
    name: "Ako",
    description: "Do not distrub unless its really important.",
    isBunny: false,
  },
  { name: "Haruna", description: "EAT OR DIE", isBunny: false },
  {
    name: "Akane",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget dui finibus, lobortis mauris ac, volutpat augue. Nam euismod eu.",
    isBunny: true,
  },
];

const chatData = [
  {
    name: "Ako",
    text: "Lorem ipsum dolor sit amet.",
    role: "student",
    isBunny: false,
  },
  {
    name: "Ako",
    text: "Lorem ipsum dolor sit amet.",
    role: "student",
    isBunny: false,
  },
  {
    name: "Haruna",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium.",
    role: "student",
    isBunny: false,
  },
  {
    text: "sensei text",
    role: "sensei",
    isBunny: false,
  },
  {
    name: "Akane",
    text: "Ihh ada yang ngomongin aku, siapa ya? ippoda itu orangnya :v. akhirnya aku bisa makan nasi goreng.",
    role: "student",
    isBunny: true,
  },
];

export const students: IStudent[] = Array(7)
  .fill(studentData)
  .flat()
  .map(({ name, description, isBunny }) => createStudent(name, description, isBunny));

export const chats: IChat[] = Array(7)
  .fill(chatData)
  .flat()
  .map(({ name, text, role, isBunny }) => createChat(name, text, role, isBunny));

export const stickers: IBase[] = Array(40)
  .fill(null)
  .map((_, i) => ({
    name: `Sticker ${i + 1}`,
    image: `/stickers/sticker (${i + 1}).png`,
  }));
