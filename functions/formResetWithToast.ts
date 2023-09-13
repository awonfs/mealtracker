export function formResetWithToast(
  form: any,
  toast: any,
  title: string,
  description: string
) {
  form.reset();
  toast.toast({
    title,
    description,
  });
}
