import { Button, Select, Switch, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { buttonOutlineClasses } from "../utils/constants";
import { notSignedInNotification } from "../utils/notification";

const Feedback = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      message: "",
      feedbackType: "",
      anonymous: false,
    },
    validate: {
      message: (value) => (value.length > 10 ? null : "Too short"),
      anonymous: (value) =>
        [true, false].includes(value) ? null : "Invalid value",
      feedbackType: (value) =>
        ["bug", "suggestion", "other", "appreciate"].includes(value)
          ? null
          : "Invalid value",
    },
  });

  const submitFeedbackHandler = async () => {
    if (!session && !form.values.anonymous) {
      notSignedInNotification("Please sign in or check Anonymous");
      return;
    }
    const validationResult = form.validate();

    if (Object.keys(validationResult.errors).length > 0) {
      return;
    }
    setLoading(true);
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.values),
    });

    const data = await res.json();
    setLoading(false);
    if (data.error) {
      // show error notif
      return;
    } else {
      form.reset();
      form.values.anonymous = false;
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-3xl font-bold pt-4 pb-0">
        Submit <span className="text-green-400 ">Feedback</span>!
      </p>
      <p className="-mt-4 text-gray-400">
        Help us make the site even better🥳{" "}
      </p>

      <Select
        className="w-[90vw] max-w-[30rem]"
        label="Feedback Type"
        placeholder="Feedback Type"
        data={[
          { value: "bug", label: "Bug" },
          { value: "suggestion", label: "Suggestion" },
          { value: "other", label: "Other" },
          { value: "appreciate", label: "Appreciate" },
        ]}
        {...form.getInputProps("feedbackType")}
      />
      <Textarea
        required={true}
        className="w-[90vw] max-w-[30rem]"
        label="Feedback"
        placeholder="Tell us on how to improve."
        {...form.getInputProps("message")}
      />
      <Switch
        label="Prefer anonymous?"
        {...form.getInputProps("anonymous", { type: "checkbox" })}
        // value={form.values.anonymous}
      />

      <Button
        loading={loading}
        onClick={submitFeedbackHandler}
        className={buttonOutlineClasses}
      >
        Submit
      </Button>
    </div>
  );
};
export default Feedback;
