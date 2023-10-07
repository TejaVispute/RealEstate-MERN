import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase"
const Profile = () => {

    const fileRef = useRef(null)
    const [file, setFile] = useState(undefined);
    const [filePercentage, setFilePercentage] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false)
    const [formData, setFormData] = useState({})
    console.log(formData)

    const { currentUser } = useSelector((state) => state.user);




    const handleFileUpload = () => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePercentage(Math.round(progress));
            },
            (error) => {
                console.log(error);
                setFileUploadError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({ ...formData, avatar: downloadURL });
                });
            }
        );
    };


    useEffect(() => {
        if (file) {
            handleFileUpload(file)
        }

    }, [file])
    return (
        <div className="max-w-lg p-3 mx-auto">
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

            <form className="flex flex-col   gap-3" >
                <input onChange={(e) => setFile(e.target.files[0])} className="hidden" accept="image/*" type="file" name="" ref={fileRef} id="" />
                <img onClick={() => fileRef.current.click()} className="rounded-full h-24 w-24 object-cover cursor-pointer self-center t-2" src={formData.avatar || currentUser.avatar} alt="profile" />
                <p className="text-center text-sm">
                    {
                        fileUploadError ?
                            (
                                <span className="text-red-700">Error image upload (image must be less than 2mb)</span>
                            ) : filePercentage > 0 && filePercentage < 100 ? (
                                <span className="text-slate-700">Uploading {filePercentage} %</span>
                            ) : filePercentage === 100 ? (
                                <span className="text-green-700"> Image successfully uploaded</span>
                            ) : (
                                ""
                            )}
                </p>
                <input value={currentUser.username
                } type="text" name="username" className="border p-3 rounded-lg focus:outline-blue-600" placeholder="username" id="username" />

                <input value={currentUser.email} type="email" name="email" className="border p-3 rounded-lg focus:outline-blue-600" placeholder="email" id="email" />

                <input type="text" name="password" className="border p-3 rounded-lg focus:outline-blue-600" placeholder="password" id="password" />
                <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80 duration-200 uppercase font-bold">Update</button>
            </form>

            <div className="flex justify-between mt-5">
                <span className="text-red-700 cursor-pointer font-bold">Delete account</span>
                <span className="text-red-700 cursor-pointer font-bold">Sign out</span>

            </div>
        </div>
    )
}

export default Profile