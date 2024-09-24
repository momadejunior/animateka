import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailedProfile() {
    const { id } = useParams(); // Destructure the id from the params
 
    const url = "https://us-west-2.cdn.hygraph.com/content/cm02ph0v902l607tfainrtrfw/master";
    const [profile, setProfile] = useState([]); // Initialize the profile state as null

    useEffect(() => {
        // If you plan to fetch data or perform any side effect when this component mounts,
        // you can do so here using the id parameter.
        console.log("Fetching data for profile with id:", id);
        const  save = localStorage.setItem("authToken",id);
        const getLoginId = localStorage.getItem("authToken");


        fetch(url,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query:`query MyProfile($id:ID) {
  profiles(where: {id: $id}) {
    id
    name
    surname
    username
    email
    bio
  }
}`,
                    variables:{
                        id:id
                    }
            })
        })

        .then(res=>res.json())
        .then(data=>{
            setProfile(data.data.profiles[0]);
        
        })




        // Fetch or any other side effect here...
    }, [id]);

    return (
        <>
            <div className="container mt-5">
        <div className="account-header">
          <img src="https://via.placeholder.com/120" alt="Profile" />
          <h2 className="mt-2">{profile.name} {profile.surname}</h2>
          <p>Manage your account settings</p>
        </div>

        <div className="row account-section">
          <div className="col-md-3">
            <ul className="nav nav-pills flex-column" id="account-tabs" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" id="profile-tab" data-bs-toggle="pill" href="#profile" role="tab" aria-controls="profile" aria-selected="true">Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="settings-tab" data-bs-toggle="pill" href="#settings" role="tab" aria-controls="settings" aria-selected="false">Account Settings</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="security-tab" data-bs-toggle="pill" href="#security" role="tab" aria-controls="security" aria-selected="false">Security</a>
              </li>
            </ul>
          </div>

          <div className="col-md-9">
            <div className="tab-content" id="account-tabs-content">
              <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <h3>Profile Information</h3>
                <form>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Enter username" value={profile.username}  readOnly />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" value={profile.email} readOnly />
                  </div>
                  <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea className="form-control" id="bio" rows="3" placeholder="Tell us about yourself" value={profile.bio}  readOnly />
                  </div>
                  <button type="submit" className="btn btn-custom">Save Changes</button>
                </form>
              </div>

              <div className="tab-pane fade" id="settings" role="tabpanel" aria-labelledby="settings-tab">
                <h3>Account Settings</h3>
                <form>
                  <div className="form-group">
                    <label htmlFor="language">Preferred Language</label>
                    <select className="form-control" id="language">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="timezone">Timezone</label>
                    <select className="form-control" id="timezone">
                      <option>GMT-5</option>
                      <option>GMT+1</option>
                      <option>GMT+10</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-custom">Update Settings</button>
                </form>
              </div>

              <div className="tab-pane fade" id="security" role="tabpanel" aria-labelledby="security-tab">
                <h3>Security Settings</h3>
                <form>
                  <div className="form-group">
                    <label htmlFor="current-password">Current Password</label>
                    <input type="password" className="form-control" id="current-password" placeholder="Current password" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="new-password">New Password</label>
                    <input type="password" className="form-control" id="new-password" placeholder="New password" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirm-password">Confirm New Password</label>
                    <input type="password" className="form-control" id="confirm-password" placeholder="Confirm new password" />
                  </div>
                  <button type="submit" className="btn btn-custom">Change Password</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
    );
}
