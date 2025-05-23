import { useForm, useFieldArray } from "react-hook-form";
import { categories } from "../../utils/constants";
import { useAddABookMutation } from "../../redux/features/books/booksApi";
const AddBook = () => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "authors",
    });

    const [addABook, { isLoading, error }] = useAddABookMutation();


    const onSubmit = async (data) => {
    
        data.genres = categories
            .filter((genre) => data.genres?.includes(genre))
            .map((genre) => genre.toLowerCase());

        data.trending = data.trending === "true";
        data.stock = parseInt(data.stock, 10);
        data.original_price = parseFloat(data.original_price);
        await addABook(data).unwrap();
        console.log("data: ", data);


        reset();
    };

  return (
    <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Add a book <span className="text-gray-500"></span></h2>
          {/* <div className="space-x-2">
            <button className="border px-3 py-1 rounded text-sm text-gray-600">All time</button>
            <button className="border px-3 py-1 rounded text-sm text-gray-600">📥</button>
          </div> */}
        </div>

        <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 bg-white border rounded-lg shadow-sm font-secondary space-y-6"
        >
            <div className="">
                <label className="block mb-1 ml-1" htmlFor="title">Title</label>
                <input {...register("title", { required: true })} name="title" className="block w-full mt-2 rounded-md border bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6" />
                {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
            </div>

            <div className="">
                <label className="block mb-1">Author Name</label>
                {fields.map((field, index) => (
                    <div key={field.id} className="border p-4 rounded space-y-2">
                        <input
                            placeholder="Author Name"
                            {...register(`authors.${index}.name`, { required: true })}
                            className="w-full border p-2 rounded"
                        />
                        <textarea
                            placeholder="Author Bio"
                            {...register(`authors.${index}.bio`)}
                            className="w-full border p-2 rounded"
                        />
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500"
                        >
                            Remove Author
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={() => append({ name: "", bio: "" })}
                    className="bg-white border-2 border-gray-200 px-3 py-1 rounded mt-2"
                >
                    + Add Author
                </button>
            </div>

            <fieldset className="">
                <label className="block mb-1">Genres</label>
                <div className="flex space-x-4">
                {categories.map((genre) => (
                        <label key={genre} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value={genre}
                                {...register("genres")}
                                className="accent-blue-600"
                            />
                            <span>{genre}</span>
                        </label>
                ))}
                </div>
            </fieldset>

            <div className="">
                <label className="block mb-1">Stock</label>
                <input type="number" min="0" {...register("stock", { required: true })} className="block w-1/12 mt-2 rounded-md border bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6" />
            </div>

            <div className="">
                <label className="block mb-1">Price</label>
                <div className="relative">
                    <span className="absolute w-3 left-3 right-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input type="number" min="0" step="0.01" {...register("original_price", { required: true })} className="block w-1/8 mt-2 rounded-md border bg-white pl-7 pr-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6" />
                </div>
            </div>

            <div className="">
                <label className="block mb-1">Trending</label>
                <select {...register("trending")} className="input">
                <option value="false">No</option>
                <option value="true">Yes</option>
                </select>
            </div>

            <div className="">
                <label className="block mb-1">Image URL (e.g., book-18.png)</label>
                <input {...register("image_url")} className="block w-full mt-2 rounded-md border bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6" />
            </div>

            <div className="">
                <label className="block mb-1">Description</label>
                <textarea {...register("description")} className="block w-full mt-2 rounded-md border bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"></textarea>
            </div>

            <button type="submit" disabled={isLoading} className="bg-blue-600 text-white px-4 py-2 rounded">
                {isLoading ? "Loading..." : "Add Book"}
            </button>
            {error && <p className="text-red-500 text-xs">{error.data?.message}</p>}
        </form>
    </div>
  )
}

export default AddBook