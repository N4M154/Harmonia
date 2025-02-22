import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashSavedPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [savedPosts, setSavedPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postIdToUnsave, setPostIdToUnsave] = useState("");

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const res = await fetch(`/api/post/savedposts`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setSavedPosts(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser) {
      fetchSavedPosts();
    }
  }, [currentUser]);

  const handleUnsavePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/post/unsave/${postIdToUnsave}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setSavedPosts((prev) =>
          prev.filter((savedPost) => savedPost.post._id !== postIdToUnsave)
        );
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {savedPosts.length > 0 ? (
        <>
          <Table className="shadow-lg dark:shadow-black">
            <Table.Head>
              <Table.HeadCell className="bg-violet-50 dark:bg-black">
                Date Saved
              </Table.HeadCell>
              <Table.HeadCell className="bg-violet-50 dark:bg-black">
                Post Image
              </Table.HeadCell>
              <Table.HeadCell className="bg-violet-50 dark:bg-black">
                Post Title
              </Table.HeadCell>
              <Table.HeadCell className="bg-violet-50 dark:bg-black">
                Category
              </Table.HeadCell>
            </Table.Head>
            {savedPosts.map((savedPost) => (
              <Table.Body className="divide-y" key={savedPost._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-[#18181b]">
                  <Table.Cell>
                    {new Date(savedPost.saveDate).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${savedPost.post.slug}`}>
                      <img
                        src={savedPost.post.image}
                        alt={savedPost.post.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/post/${savedPost.post.slug}`}
                    >
                      {savedPost.post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{savedPost.post.category}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p className="dark:text-gray-400">You have not saved any posts yet!</p>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to unsave this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleUnsavePost}>
                Yes, unsave
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
