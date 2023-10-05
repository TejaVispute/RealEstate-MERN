import { useSelector } from "react-redux"

const Profile = () => {

    const { currentUser } = useSelector((state) => state.user);
    return (
        <div className="max-w-lg p-3 mx-auto">
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

            <form className="flex flex-col   gap-3" >
                <img className="rounded-full h-24 w-24 object-cover cursor-pointer self-center t-2" src={currentUser.avatar} alt="profile" />
                <input type="text" name="username" className="border p-3 rounded-lg focus:outline-blue-600" placeholder="username" id="username" />

                <input type="email" name="email" className="border p-3 rounded-lg focus:outline-blue-600" placeholder="email" id="email" />

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