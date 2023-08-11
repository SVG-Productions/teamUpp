import React, { useState, useRef, FormEvent } from "react";
import trimUrl from "../utils/trimUrl";
import useOnClickOutside from "../hooks/useOnClickOutside";
import axios from "axios";
import { toast } from "react-hot-toast";
import { basicToast } from "../utils/toastOptions";
import { useBoard } from "../context/BoardContext";

const BoardAppComp = ({
  title,
  value,
  name,
  appId,
  setAppData,
  amount,
  frequency,
}: {
  title: string;
  value: string;
  name: string;
  appId: string;
  setAppData: any;
  amount?: string;
  frequency?: string;
}) => {
  const [showInput, setShowInput] = useState(false);
  const [amountInput, setAmountInput] = useState(amount);
  const [frequencyInput, setFrequencyInput] = useState(frequency);
  const { setBoardData } = useBoard();
  const editRef = useRef(null);

  const handleAcceptEdit = async () => {
    if (amount === amountInput && frequency === frequencyInput) {
      setShowInput(false);
      return;
    }
    try {
      setAppData((prev: any) => ({
        ...prev,
        ["salaryAmount"]: amountInput,
        ["salaryFrequency"]: frequencyInput,
      }));
      await axios.patch(`/api/listings/${appId}`, {
        ["salaryAmount"]: amountInput,
        ["salaryFrequency"]: frequencyInput,
      });
      setShowInput(false);
    } catch (error) {
      toast.error("Error updating application.", basicToast);
    }
  };

  const handleAcceptEditSubmission = async (e: FormEvent) => {
    e.preventDefault();
    await handleAcceptEdit();
  };

  useOnClickOutside(editRef, handleAcceptEdit);

  const displayedValue = (
    <div className="flex text-xs items-center w-full py-1 px-2 rounded-sm truncate hover:bg-tertiary">
      <span>{value}</span>
    </div>
  );
  return (
    <div className="flex items-center">
      <span className="text-sm w-2/5 py-1 font-semibold">{title}</span>
      <div className="w-3/5" ref={editRef} onClick={() => setShowInput(true)}>
        {showInput ? (
          <form onSubmit={handleAcceptEditSubmission} className="flex gap-1">
            <span>$</span>
            <input
              id={name}
              value={amountInput}
              autoComplete="off"
              autoFocus
              onChange={(e) => setAmountInput(e.target.value)}
              className="text-xs py-1 px-2 w-full rounded-sm bg-tertiary"
            />
            <select
              className="w-2/3 border border-borderprimary text-xs bg-primary rounded py-1 px-1.5 text-primary leading-tight focus:outline-bluegray"
              id="salaryFrequency"
              value={frequencyInput}
              onChange={(e) => setFrequencyInput(e.target.value)}
            >
              <option value="">Select frequency</option>
              <option value="hourly">Hourly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            <button className="hidden">Submit</button>
          </form>
        ) : (
          displayedValue
        )}
      </div>
    </div>
  );
};

export default BoardAppComp;
