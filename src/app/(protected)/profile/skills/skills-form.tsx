import { user } from "~/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { getUserSkills } from "~/lib/db/skills";
import { SkillsManager } from "./skills-manager";

export interface SkillManagerProps {
  className?: string;
}

export const SkillsForm = async (props: SkillManagerProps) => {
  const session = await user();
  if (!session) {
    return null;
  }
  const data = await getUserSkills(session.id);
  return (
    <Card className={props.className}>
      <CardContent>
        <CardTitle>Skills</CardTitle>
        <CardDescription>Manage your skills and expertise.</CardDescription>
        <Tabs defaultValue="hard">
          <TabsList variant="boxed" className="mb-2">
            <TabsTrigger value="hard">Hard</TabsTrigger>
            <TabsTrigger value="soft">Soft</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          <TabsContent value="hard">
            <SkillsManager skills={data.HARD} type="HARD" example='Ex: React.js' />
          </TabsContent>
          <TabsContent value="soft">
            <SkillsManager skills={data.SOFT} type="SOFT" example='Ex: Time management' />
          </TabsContent>
          <TabsContent value="other">
            <SkillsManager skills={data.OTHER} type="OTHER" example='Ex: Excel' />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
