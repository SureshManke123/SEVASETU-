import { useEffect, useState } from "react";
import API from "../api";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/auth/me")
      .then(({ data }) => setProfile(data.user))
      .catch((err) => setError(err.response?.data?.message || "Please log in to view your profile."));
  }, []);

  const handleSave = async () => {
    try {
      const { data } = await API.put("/auth/update-profile", { name: profile.name, phone: profile.phone, address: profile.address });
      setProfile(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      setIsEditing(false);
      alert(data.message);
    } catch (err) { alert(err.response?.data?.message || "Could not update profile."); }
  };

  if (error) return <div className="min-h-screen p-8 text-center text-red-600">{error}</div>;
  if (!profile) return <div className="min-h-screen p-8 text-center">Loading profile…</div>;
  return <div className="min-h-screen bg-gray-100 p-6">
    <div className="bg-red-600 text-white p-6 rounded-xl shadow-lg mb-8"><h1 className="text-4xl font-bold">My Profile</h1><p className="mt-2">Manage your account information</p></div>
    <div className="bg-white shadow-lg rounded-xl p-8 max-w-4xl mx-auto">
      <div className="flex flex-col items-center mb-8"><div className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center text-white text-5xl font-bold">{profile.name?.charAt(0)}</div><h2 className="text-3xl font-bold mt-4">{profile.name}</h2><p className="text-gray-500 capitalize">{profile.role}</p></div>
      <div className="grid md:grid-cols-2 gap-6">
        <label className="font-semibold">Full Name<input name="name" value={profile.name || ""} onChange={(e) => setProfile({ ...profile, name: e.target.value })} disabled={!isEditing} className="w-full border p-3 rounded mt-2" /></label>
        <label className="font-semibold">Email<input value={profile.email || ""} disabled className="w-full border p-3 rounded mt-2" /></label>
        <label className="font-semibold">Mobile Number<input name="phone" value={profile.phone || ""} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} disabled={!isEditing} className="w-full border p-3 rounded mt-2" /></label>
        <label className="font-semibold">Experience<input value={profile.experience || 0} disabled className="w-full border p-3 rounded mt-2" /></label>
        <label className="font-semibold md:col-span-2">Address<textarea name="address" value={profile.address || ""} onChange={(e) => setProfile({ ...profile, address: e.target.value })} disabled={!isEditing} rows="3" className="w-full border p-3 rounded mt-2" /></label>
      </div>
      <div className="mt-8">{!isEditing ? <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white px-6 py-3 rounded-lg">Edit Profile</button> : <button onClick={handleSave} className="bg-green-600 text-white px-6 py-3 rounded-lg">Save Changes</button>}</div>
    </div>
  </div>;
}
export default Profile;
