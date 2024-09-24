import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";


export default function Perfil() {
  const url = "https://us-west-2.cdn.hygraph.com/content/cm02ph0v902l607tfainrtrfw/master";
  const [profile, setProfile] = useState({});
  const {id} = useParams();

  

  const query = `
   query MyQuery ($id:ID!){
  profiles(where:{id:$id}) {
    id
    name
    surname
    email
    bio
  }
}`;

  useEffect(() => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        query: query, 
        variables: { id:id} 
      }),
    })
    .then((response) => response.json())
    .then((data) => {
       
    })
    .catch((error) =>{
      alert('login failed')
    });
  }, []);

  return (
    <>
    <motion.div
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ x: 100, opacity: 0 }}
  transition={{
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 },
    duration: 0.5,
  }}
>


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
                    <input type="text" className="form-control" id="username" placeholder="Enter username" value={profile.name || ""} readOnly />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" value={profile.email || ""} readOnly />
                  </div>
                  <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea className="form-control" id="bio" rows="3" placeholder="Tell us about yourself" value={profile.bio || ""} readOnly />
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
</motion.div>
    </>
  );
}
