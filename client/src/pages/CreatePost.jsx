// import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from "firebase/storage";
// import { app } from "../firebase";
// import { useState } from "react";
// import { CircularProgressbar } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import { useNavigate } from "react-router-dom";
// import "../index.css";

// export default function CreatePost() {
//   const [file, setFile] = useState(null);
//   const [imageUploadProgress, setImageUploadProgress] = useState(null);
//   const [imageUploadError, setImageUploadError] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [publishError, setPublishError] = useState(null);

//   const navigate = useNavigate();

//   const handleUpdloadImage = async () => {
//     try {
//       if (!file) {
//         setImageUploadError("Please select an image");
//         return;
//       }
//       setImageUploadError(null);
//       const storage = getStorage(app);
//       const fileName = new Date().getTime() + "-" + file.name;
//       const storageRef = ref(storage, fileName);
//       const uploadTask = uploadBytesResumable(storageRef, file);
//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           setImageUploadProgress(progress.toFixed(0));
//         },
//         (error) => {
//           setImageUploadError("Image upload failed");
//           setImageUploadProgress(null);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             setImageUploadProgress(null);
//             setImageUploadError(null);
//             setFormData({ ...formData, image: downloadURL });
//           });
//         }
//       );
//     } catch (error) {
//       setImageUploadError("Image upload failed");
//       setImageUploadProgress(null);
//       console.log(error);
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("/api/post/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         setPublishError(data.message);
//         return;
//       }

//       if (res.ok) {
//         setPublishError(null);
//         navigate(`/post/${data.slug}`);
//       }
//     } catch (error) {
//       setPublishError("Something went wrong");
//     }
//   };
//   return (
//     <div className="bg-gradient-to-b from-white to-violet-100 dark:from-[#18181b] dark:to-black">
//       {" "}
//       <div className="p-3 max-w-3xl mx-auto min-h-screen">
//         <h1 className="text-center text-3xl my-7 font-thin dark:text-white">
//           Create a post
//         </h1>
//         <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//           <div className="flex flex-col gap-4 sm:flex-row justify-between">
//             <TextInput
//               type="text"
//               placeholder="Title"
//               required
//               id="title"
//               className="flex-1"
//               onChange={(e) =>
//                 setFormData({ ...formData, title: e.target.value })
//               }
//             />
//             <Select
//               onChange={(e) =>
//                 setFormData({ ...formData, category: e.target.value })
//               }
//             >
//               <option value="Casual">Casual</option>
//               <option value="Song | Album">Song | Album</option>
//               <option value="Artist | Legends">Artist | Legends</option>
//               <option value="Lyricism | Songwriting">
//                 Lyricism | Songwriting
//               </option>
//               <option value="Soundtrack | Scores">Soundtrack | Scores</option>
//               <option value="Events | Accolades">Events | Accolades</option>
//             </Select>
//           </div>
//           <div className="flex gap-4 items-center justify-between border-4 border-violet-500 border-dotted p-3">
//             <FileInput
//               type="file"
//               accept="image/*"
//               onChange={(e) => setFile(e.target.files[0])}
//             />
//             <Button
//               type="button"
//               className="bg-violet-400 dark:bg-violet-500 hover:!bg-violet-500 dark:hover:!bg-violet-700 text-black dark:text-black"
//               size="sm"
//               onClick={handleUpdloadImage}
//               disabled={imageUploadProgress}
//             >
//               {imageUploadProgress ? (
//                 <div className="w-16 h-16">
//                   <CircularProgressbar
//                     value={imageUploadProgress}
//                     text={`${imageUploadProgress || 0}%`}
//                     styles={{
//                       path: {
//                         stroke: "black",
//                         strokeWidth: 8,
//                       },
//                       text: {
//                         fill: "black",
//                         fontSize: "16px",
//                       },
//                       trail: {
//                         stroke: "white",
//                         strokeWidth: 8,
//                       },
//                     }}
//                   />
//                 </div>
//               ) : (
//                 "Upload Image"
//               )}
//             </Button>
//           </div>
//           {imageUploadError && (
//             <Alert color="failure">{imageUploadError}</Alert>
//           )}
//           {formData.image && (
//             <img
//               src={formData.image}
//               alt="upload"
//               className="w-full h-72 object-cover"
//             />
//           )}
//           <ReactQuill
//             theme="snow"
//             placeholder="Write something..."
//             className="h-72 mb-12 dark:text-white custom-placeholder"
//             required
//             onChange={(value) => {
//               setFormData({ ...formData, content: value });
//             }}
//           />
//           <Button
//             type="submit"
//             className="bg-violet-500 dark:bg-violet-500 hover:!bg-violet-600 dark:hover:!bg-violet-700 text-black"
//           >
//             Publish
//           </Button>
//           {publishError && (
//             <Alert className="mt-5" color="failure">
//               {publishError}
//             </Alert>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }

import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import "../index.css";

// Import Quill modules
import { Quill } from "react-quill";
import ImageResize from "quill-image-resize"; // For resizing images

// Register the ImageResize module
Quill.register("modules/imageResize", ImageResize);

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image"],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["blockquote", "code-block"],
      ["clean"],
    ],
    imageResize: true,
  };

  return (
    <div className="bg-gradient-to-b from-white to-violet-100 dark:from-[#18181b] dark:to-black">
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-thin dark:text-white">
          Create a post
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              type="text"
              placeholder="Title"
              required
              id="title"
              className="flex-1"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <Select
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="Casual">Casual</option>
              <option value="Song | Album">Song | Album</option>
              <option value="Artist | Legends">Artist | Legends</option>
              <option value="Lyricism | Songwriting">
                Lyricism | Songwriting
              </option>
              <option value="Soundtrack | Scores">Soundtrack | Scores</option>
              <option value="Events | Accolades">Events | Accolades</option>
            </Select>
          </div>

          <div className="flex gap-4 items-center justify-between border-4 border-violet-500 border-dotted p-3">
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              type="button"
              className="bg-violet-400 dark:bg-violet-500 hover:!bg-violet-500 dark:hover:!bg-violet-700 text-black dark:text-black"
              size="sm"
              onClick={handleUploadImage}
              disabled={imageUploadProgress}
            >
              {imageUploadProgress ? (
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={imageUploadProgress}
                    text={`${imageUploadProgress || 0}%`}
                    styles={{
                      path: { stroke: "black", strokeWidth: 8 },
                      text: { fill: "black", fontSize: "16px" },
                      trail: { stroke: "white", strokeWidth: 8 },
                    }}
                  />
                </div>
              ) : (
                "Upload Image"
              )}
            </Button>
          </div>

          {imageUploadError && (
            <Alert color="failure">{imageUploadError}</Alert>
          )}

          <ReactQuill
            theme="snow"
            placeholder="Write something..."
            className="h-72 mb-12 dark:text-white custom-placeholder"
            required
            value={formData.content || ""}
            onChange={(value) => setFormData({ ...formData, content: value })}
            modules={modules} // Add toolbar and imageResize configuration
          />

          <Button
            type="submit"
            className="bg-violet-500 dark:bg-violet-500 hover:!bg-violet-600 dark:hover:!bg-violet-700 text-black"
          >
            Publish
          </Button>

          {publishError && (
            <Alert className="mt-5" color="failure">
              {publishError}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}
