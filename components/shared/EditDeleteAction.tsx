"use client";

import { deleteAnswer } from "@/database/actions/answer.action";
import { deleteQuestion } from "@/database/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

interface Props {
  type: string;
  itemId: string;
  questionId?: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const handleEdit = () => {
    router.push(`/edit-question/${JSON.parse(itemId)}`);
  };
  const handleDelete = async () => {
    try {
      if (type === "question") {
        await deleteQuestion({
          questionId: JSON.parse(itemId),
          path: pathname,
        });
        toast({
          title: `Your question has been deleted.`,
          variant: "success",
        });
      } else if (type === "answer") {
        await deleteAnswer({
          answerId: JSON.parse(itemId),
          path: pathname,
          questionId: JSON.parse(itemId),
        });
        toast({
          title: `Your answer has been deleted.`,
          variant: "success",
        });
      }
    } catch (error: any) {
      toast({
        title: `There seems to be a problem! ${error.message}`,
        variant: "destructive",
      });
    }
  };
  return (
    <div className="flex shrink-0 items-center justify-end gap-3 max-sm:w-full">
      {type === "question" && (
        <Image
          src="/icons/edit.svg"
          alt="edit"
          width={14}
          height={14}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}
      <Image
        src="/icons/trash.svg"
        alt="delete"
        width={14}
        height={14}
        className="cursor-pointer object-contain"
        onClick={handleDelete}
      />
    </div>
  );
};

export default EditDeleteAction;
