import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getPurchases, getUserInfo } from "../../services/api";
import { getUser } from "../../store/selectors";
import "./Profile.scss";

const Profile = () => {

  // States
  const [userInfo, setUserInfo] = useState();
  const [purchases, setPurchases] = useState([]);
  const [userInfoLoading, setUserInfoLoading] = useState(false);
  const [purchaseLoading, setPurchaseLoading] = useState(false);

  // Selectors
  const user = useSelector(getUser);

  // Functions
  const fetchUserInfo = useCallback(async () => {
    if (user) {
      setUserInfoLoading(true);
      const res = await getUserInfo(user.uid);
      setUserInfoLoading(false);
      setUserInfo(res);
    }
  }, [user]);

  const fetchPurchases = useCallback(async () => {
    if (user) {
      setPurchaseLoading(true);
      const res = await getPurchases(user.uid);
      setPurchaseLoading(false);
      setPurchases(res);
    }
  }, [user]);

  useEffect(fetchUserInfo, [fetchUserInfo]);
  useEffect(fetchPurchases, [fetchPurchases]);

  return (
    <div className="container profile">
      <h1>Profile</h1>
      {userInfoLoading && purchaseLoading && (
        <div className="profile-loading">  
          <div className="spinner-border profile-spinner" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!userInfoLoading && !purchaseLoading && (
        <>
          {userInfo && (
            <>
              <p className="h3">Name: {userInfo?.name || ""}</p>
              <p className="h3">Email: {userInfo?.email || ""}</p>
              <p className="h3">Balance: ${userInfo?.balance || 0}</p>
              <p className="h3">Is Member: {userInfo?.isMember ? "Yes" : "No"}</p>
            </>
          )}
          <h2>Purchases:</h2>
          <div>
            {purchases.length === 0 && (
              <div className="h3 purchases-placeholder">
                No Purchases
              </div>
            )}
            {purchases.length > 0 && purchases.map(purchase => (
              <div key={purchase.id} className="card">
                <div className="card-body">
                  <div className="purchase-info">
                    <div className="h3">{purchase.name} x {purchase.quantity}</div>
                    <div className="h3">${purchase.price}</div>
                  </div>
                  <div className="h4">Total: ${purchase.quantity * purchase.price}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
