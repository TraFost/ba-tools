import ChatBubble from "components/momotalk/chat-bubble";
import ChatInput from "components/momotalk/chat-input";
import StudentList from "components/momotalk/student-list";
import { Link } from "components/ui/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { HomeIcon } from "lucide-react";

import { chats, students } from "../data/dataDummy";

const MomotalkPage = () => {
  return (
    <div className="size-full flex items-center justify-center">
      <div className="max-lg:size-full bg-white size-10/12 lg:border-2 lg:rounded-xl lg:border-momo">
        <header className="bg-momo px-4 py-2 lg:rounded-t-lg flex justify-between items-center h-[60px]">
          <p className="text-white text-3xl font-bold">Momotalk</p>
          <Link href={"/"} className="border rounded-lg p-2 text-white">
            <HomeIcon />
          </Link>
        </header>
        {/* Desktop */}
        <main className="flex size-full max-lg:hidden h-[calc(100%-60px)]">
          <section className="overflow-y-auto w-3/4">
            {students.map((student, i) => (
              <StudentList
                key={`${student.name}-${i}`}
                icon={student.icon}
                name={student.name}
                description={student.description}
              />
            ))}
          </section>
          <section className="w-full">
            <div className="overflow-y-auto h-[calc(100%-77px)] py-4 flex flex-col gap-1">
              {chats.map((chat, i) => (
                <ChatBubble
                  key={`${chat.name}-${i}`}
                  isPrevious={i > 0 && chats[i - 1].name === chat.name}
                  icon={chat.icon}
                  name={chat.name}
                  role={chat.role}
                  text={chat.text}
                />
              ))}
            </div>
            <ChatInput />
          </section>
        </main>

        {/* Mobile */}
        <Tabs defaultValue="students" className="lg:hidden h-[calc(100vh-108px)]">
          <TabsList className="fixed bottom-0 flex bg-accent text-white w-full">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>
          <TabsContent value="students" className="overflow-y-auto h-[calc(100vh-108px)]">
            {students.map((student, i) => (
              <StudentList
                key={`${student.name}-${i}`}
                icon={student.icon}
                name={student.name}
                description={student.description}
              />
            ))}
          </TabsContent>
          <TabsContent value="chat" className="flex flex-col max-h-[calc(100vh-108px)]">
            <div className="overflow-y-auto pb-4 flex flex-col gap-1.5">
              {chats.map((chat, i) => (
                <ChatBubble
                  key={`${chat.name}-${i}`}
                  isPrevious={i > 0 && chats[i - 1].name === chat.name}
                  icon={chat.icon}
                  name={chat.name}
                  role={chat.role}
                  text={chat.text}
                />
              ))}
            </div>
            <ChatInput />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MomotalkPage;
