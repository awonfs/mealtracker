import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/app/_trpc/client";
import { formResetWithToast } from "@/functions/formResetWithToast";

const formSchema = z.object({
  mealName: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  day: z.string().min(2).max(50),
});
function MealEditForm({
  foodCardId,
  mealId,
  mealName,
  description,
  day,
}: {
  foodCardId: number;
  mealId: number;
  mealName: string;
  description: string;
  day: string;
}) {
  const toast = useToast();
  //*TRPC calls
  const getMeals = trpc.getMealsByFoodCardId.useQuery(foodCardId);
  const editMeal = trpc.editMeal.useMutation({
    onSettled: () => {
      getMeals.refetch();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mealName: mealName,
      description: description,
      day: day,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const mealData = {
      ...values,
      foodCardId: foodCardId,
      id: mealId,
    };
    await editMeal.mutateAsync(mealData);
    form.setValue("mealName", "");
    form.setValue("description", "");
    form.setValue("day", "");
    toast.toast({
      title: `${values.mealName} edited`,
      description: "Your meal has been edited successfully!",
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="mealName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meal</FormLabel>
              <FormControl>
                <Input placeholder="Change the name here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Change the description here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="day"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Day</FormLabel>
              <FormControl>
                <Input placeholder="Change the day here" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full rounded" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default MealEditForm;
