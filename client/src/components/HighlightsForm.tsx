import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadHighlights } from "../services/highlights";
import { ScaleLoader } from "react-spinners";

type HighlightsFormProps = {
  finishedBookId: number;
};

function HighlightsForm({ finishedBookId }: HighlightsFormProps) {
  const formRef = useRef(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: uploadHighlights,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["finished-book-highlights", finishedBookId],
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    mutation.mutate({ formData });
  };

  if (mutation.isLoading)
    return (
      <div className="mx-auto mb-5 text-center">
        <ScaleLoader></ScaleLoader>
      </div>
    );

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <input
        type="number"
        name="finishedBookId"
        value={finishedBookId}
        hidden
        readOnly
      />
      <input
        type="file"
        name="highlights-file"
        required
        className="my-3 mx-3 rounded-md border border-none bg-gray-800 px-3 py-2"
      />
      <input
        type="submit"
        value="Submit"
        className="rounded bg-green-500/50 py-2 px-4 font-bold text-white hover:bg-green-700/50"
      />
    </form>
  );
}

export default HighlightsForm;
