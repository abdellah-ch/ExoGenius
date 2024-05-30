import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Switch } from "../ui/switch";
import { toast } from "../ui/use-toast";
import { useRef, useState } from "react";

const ExamConfigFormSchema = z.object({
  TimeLimit: z.boolean().default(false).optional(),
  social_emails: z.boolean().default(false).optional(),
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
});

type ExamConfigFormValues = z.infer<typeof ExamConfigFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ExamConfigFormValues> = {
  TimeLimit: true,
  marketing_emails: false,
  social_emails: true,
  security_emails: true,
};
interface StepProps {
  duration: string | undefined;
  setDuration: React.Dispatch<React.SetStateAction<string | undefined>>;
  subject: string | null;
  setSubject: React.Dispatch<React.SetStateAction<string | null>>;
  isLocked: boolean;
  setIsLocked: React.Dispatch<React.SetStateAction<boolean>>;
}

function ExamConfig(props: StepProps) {
  const form = useForm<ExamConfigFormValues>({
    resolver: zodResolver(ExamConfigFormSchema),
    defaultValues,
  });

  const TimeRef = useRef<HTMLInputElement>(null);
  // function onSubmit(data: NotificationsFormValues) {
  //   toast({
  //     title: "You submitted the following values:",
  //     description: (
  //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //       </pre>
  //     ),
  //   });
  // }
  const [isTimeLimitEnabled, setIsTimeLimitEnabled] = useState<boolean>(
    defaultValues.TimeLimit
  );

  const handelChange = () => {
    props.setDuration(TimeRef.current?.value);
  };

  return (
    <Form {...form}>
      <form onSubmit={() => {}} className="space-y-8 px-20 py-6">
        <div>
          <h3 className="mb-4 text-lg font-medium">Configuration</h3>
          <div className="space-y-4 ml-3">
            <FormField
              control={form.control}
              name="TimeLimit"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Set a time limit
                    </FormLabel>
                    <FormDescription>
                      Pre-define how much time the students will have before
                      being required to hand in the exam.
                      {isTimeLimitEnabled && (
                        <div className="flex items-center space-x-2 pt-4 ml-2">
                          <input
                            ref={TimeRef}
                            type="number"
                            placeholder="60"
                            className="border border-zinc-300 rounded-md py-1 pl-1 pr-4 w-16 text-center"
                            onChange={handelChange}
                          />
                          <label className="text-zinc-700">
                            minutes after the student's entrance
                          </label>
                        </div>
                      )}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        setIsTimeLimitEnabled(checked);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marketing_emails"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Exam Subject</FormLabel>
                    <FormDescription>Choose the Exam subject</FormDescription>
                  </div>
                  <FormControl>
                    <Select
                      onValueChange={(val) => {
                        props.setSubject(val);
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Math">Math</SelectItem>
                        <SelectItem value="Programming">Programming</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="social_emails"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Exam access</FormLabel>
                    <FormDescription>
                      {" "}
                      Enable or disable Exam access
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        console.log(checked);

                        props.setIsLocked(checked);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="security_emails"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Cheat prevention
                    </FormLabel>
                    <FormDescription>will see about that</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}

export default ExamConfig;
