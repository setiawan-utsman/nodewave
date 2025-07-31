import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { use, useState } from 'react'
import { serviceCreate, serviceDelete, serviceGetAll } from '../Services/authService';
import ModalAddTodo from '../../components/ModalAddTodo';
export default function AdminPage() {
const [showModal, setShowModal] = useState(false);
const queryClient = useQueryClient();


//   const { isPending, error, data, isFetching } = useQuery({
//     queryKey: ["todo"],
//     queryFn: async () => {
//       const response = 
//   });

const { data, isPending } = useQuery({
  queryKey: ["todos"],
  queryFn: () => serviceGetAll('todos'),
});

// const { data, isLoading,error,refetch} = useQuery('productData', () => fetchProducts());

const delateTodo = (id:any) => {
  delate.mutate(id);
}

const delate = useMutation({
  mutationFn:serviceDelete,
  onSuccess: (data) => {
    console.log(data);
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
  onError: (error) => {
    console.log(error);
  },
});

const handleAdd = (e:any) => {
  // setShowModal(false);
 createTodo.mutate(e);
};

const createTodo = useMutation({
  mutationFn:serviceCreate,
  onSuccess: (data) => {
    console.log(data);
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
  onError: (error) => {
    console.log(error);
  },
})

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">To Do</h2>
      <button
        className="text-white bg-red-400 py-2 px-4 rounded-xl"
        onClick={() => setShowModal(true)}
      >
        Add
      </button>
      <div className="bg-white rounded-xl shadow p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b p-2">
              <th className="pb-2">Name</th>
              <th className="pb-2">Todo</th>
              <th className="pb-2 text-center">Status</th>
              <th className="pb-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.content?.entries?.map((item: any) => (
              <tr className="border-b last:border-b-0">
                <td className="p-2">{item?.item}</td>
                <td className="p-2">{item?.todo || "-"}</td>
                <td className="py-2 px-4 text-center">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      item?.isDone
                        ? "bg-green-400 text-white"
                        : "bg-red-400 text-white"
                    }`}
                  >
                    {item?.isDone ? "Success" : "Pending"}
                  </span>
                </td>
                <td
                  className="p-2 text-center text-red-400 cursor-pointer"
                  onClick={() => delateTodo(item?.id)}
                >
                  Hapus
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalAddTodo
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAdd}
      />
    </>
  );
}
