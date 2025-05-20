
"use client";

import type { PatientData } from "@/lib/zod-schemas";
import { PatientDataSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, User, CalendarDays, Briefcase, HomeIcon, Droplet, Scale, Cigarette, Heart, UsersIcon } from "lucide-react";

interface PatientDataFormProps {
  onSubmit: (data: PatientData) => Promise<void>;
  isLoading: boolean;
}

const iconProps = { className: "mr-2 h-4 w-4 text-muted-foreground" };

export function PatientDataForm({ onSubmit, isLoading }: PatientDataFormProps) {
  const form = useForm<PatientData>({
    resolver: zodResolver(PatientDataSchema),
    defaultValues: {
      gender: undefined, // To show placeholder
      age: undefined,
      hypertension: false,
      heartDisease: false,
      everMarried: undefined,
      workType: undefined,
      residenceType: undefined,
      avgGlucoseLevel: undefined,
      bmi: undefined,
      smokingStatus: undefined,
    },
  });

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-primary">Enter Patient Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><UsersIcon {...iconProps} />Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><CalendarDays {...iconProps} />Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 55" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="everMarried"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><Heart {...iconProps} />Ever Married</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select marital status" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><Briefcase {...iconProps} />Work Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select work type" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Private">Private</SelectItem>
                        <SelectItem value="Self-employed">Self-employed</SelectItem>
                        <SelectItem value="Govt_job">Government Job</SelectItem>
                        <SelectItem value="children">Child</SelectItem>
                        <SelectItem value="Never_worked">Never Worked</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="residenceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><HomeIcon {...iconProps} />Residence Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select residence type" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Urban">Urban</SelectItem>
                        <SelectItem value="Rural">Rural</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="avgGlucoseLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><Droplet {...iconProps} />Average Glucose Level (mg/dL)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 90" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bmi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><Scale {...iconProps} />BMI (Body Mass Index)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 24.5" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="smokingStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><Cigarette {...iconProps} />Smoking Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select smoking status" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="formerly smoked">Formerly Smoked</SelectItem>
                        <SelectItem value="never smoked">Never Smoked</SelectItem>
                        <SelectItem value="smokes">Smokes</SelectItem>
                        <SelectItem value="Unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hypertension"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm col-span-1 md:col-span-2">
                    <div className="space-y-0.5">
                      <FormLabel className="flex items-center"><Heart {...iconProps} />Hypertension</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="heartDisease"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm col-span-1 md:col-span-2">
                    <div className="space-y-0.5">
                      <FormLabel className="flex items-center"><Heart {...iconProps} />Heart Disease</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              ) : (
                "Predict Stroke Risk"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
