import { user } from "~/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { getUserSkills } from "~/lib/db/skills";
import { AppSectionContent } from "../../app-section";
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
    <>
      <AppSectionContent className={props.className}>
        <Tabs defaultValue="hard">
          <TabsList className="mb-2 w-full">
            <TabsTrigger value="hard" className="grow">
              Hard
            </TabsTrigger>
            <TabsTrigger value="soft" className="grow">
              Soft
            </TabsTrigger>
            <TabsTrigger value="other" className="grow">
              Other
            </TabsTrigger>
          </TabsList>
          <TabsContent value="hard">
            <SkillsManager
              skills={data.HARD}
              type="HARD"
              example="Ex: React.js"
            />
          </TabsContent>
          <TabsContent value="soft">
            <SkillsManager
              skills={data.SOFT}
              type="SOFT"
              example="Ex: Time management"
            />
          </TabsContent>
          <TabsContent value="other">
            <SkillsManager
              skills={data.OTHER}
              type="OTHER"
              example="Ex: Excel"
            />
          </TabsContent>
        </Tabs>
      </AppSectionContent>
    </>
  );
};
