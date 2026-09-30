import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { AButton } from "@/components/atoms/AButton/AButton";
import { AInput } from "@/components/atoms/AInput/AInput";
import { ASelect } from "@/components/atoms/ASelect/ASelect";
import { ATextarea } from "@/components/atoms/ATextarea/ATextarea";
import { MFormField } from "@/components/molecules/MFormField/MFormField";
import { PLACE_CATEGORY_OPTIONS, getPlaceNameError, isPlaceCategory } from "@/models/place";
import type { PlaceCategory, PlaceInput } from "@/models/place";

type PlaceFormProps = {
  isPending?: boolean;
  onAdd: (input: PlaceInput) => Promise<boolean>;
};

export const OPlaceForm = ({ isPending = false, onAdd }: PlaceFormProps) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<PlaceCategory>("nature");
  const [cost, setCost] = useState("0");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState("");

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const nameValidationError = getPlaceNameError(trimmedName);
    setNameError(nameValidationError);
    if (nameValidationError) return;

    const isAdded = await onAdd({
      name: trimmedName,
      category,
      costPln: Math.max(0, Math.round(Number(cost))),
      description: description.trim(),
    });

    if (!isAdded) return;

    setName("");
    setCategory("nature");
    setCost("0");
    setDescription("");
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    if (isPlaceCategory(value)) setCategory(value);
  };

  return (
    <form
      className={[
        "rounded-xl border border-line/40 bg-surface",
        "grid content-start gap-4 p-6",
      ].join(" ")}
      onSubmit={handleSubmit}
      noValidate
    >
      <h2 className="text-lg font-semibold">Add a place</h2>
      <MFormField
        label="Place name"
        error={nameError}
      >
        <AInput
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          aria-invalid={Boolean(nameError)}
        />
      </MFormField>
      <MFormField label="Category">
        <ASelect
          options={PLACE_CATEGORY_OPTIONS}
          value={category}
          onChange={handleCategoryChange}
        />
      </MFormField>
      <MFormField label="Cost per person (PLN)">
        <AInput
          type="number"
          value={cost}
          onChange={(event) => setCost(event.target.value)}
        />
      </MFormField>
      <MFormField label="Description (optional)">
        <ATextarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </MFormField>
      <AButton
        type="submit"
        isLoading={isPending}
      >
        Add place
      </AButton>
    </form>
  );
};
