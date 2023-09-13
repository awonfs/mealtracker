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

const formSchema = z.object({
  mealName: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  day: z.string().min(2).max(50),
});

function MealForm({ foodCardId }: { foodCardId: string }) {
  const foodCardIdToInt = parseInt(foodCardId);
  const toast = useToast();
  //*TRPC calls
  const getMeals = trpc.getMealsByFoodCardId.useQuery(foodCardIdToInt);
  const addMeal = trpc.addMeal.useMutation({
    onSettled: () => {
      getMeals.refetch();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mealName: "",
      description: "",
      day: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const mealData = {
      ...values,
      foodCardId: foodCardIdToInt,
    };

    await addMeal.mutateAsync(mealData);
    form.reset();
    toast.toast({
      title: "Meal added",
      description: "Your meal has been added",
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
                <Input placeholder="What did you cook?" {...field} />
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
                <Input placeholder="Describe your meal" {...field} />
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
                <Input placeholder="When did you cook this food?" {...field} />
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

export default MealForm;
