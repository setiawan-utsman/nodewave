import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import React, { useState } from 'react'
import { AlertDialogFooter, AlertDialogHeader } from './AlertDialog';

const ModalAddTodo: React.FC<any> = ({isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState<any>({ item: ""});
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ item: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Add To Do</h2>

        <form>
          <label htmlFor=""></label>
          <input
            type="text"
            placeholder="Name"
            value={form.item}
            onChange={(e) => setForm({ ...form, item: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSubmit}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};


export default ModalAddTodo;