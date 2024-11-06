import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { db } from "../Firebase/Authentication";
import { doc, getDoc } from "firebase/firestore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({totalQuantity, totalPrice}) {
  const [data, setData] = React.useState({});
  const userInfo = useSelector((state) => state.persistedReducer.onAuth);
  
  // const totalPrice

  useEffect(() => {
    if (userInfo?.user?.uid) {
      const fetchUserData = async () => {
        try {
          const docRef = doc(db, "users", userInfo.user.uid); // Fetch the document by uid
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            setData(docSnap.data()); // Set fetched data to state
          } else {
            // console.log("No such document!");
          }
        } catch (error) {
          // console.error("Error fetching document:", error);
        }
      };

      fetchUserData();
    }
  }, [userInfo]);

  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained"  onClick={handleOpen}>Order Now</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} position={'absolute'} >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="Remy Sharp"
                src={data?.image}
                sx={{ width: 60, height: 60 }}
              />
            </Stack>
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           <ul className="flex flex-col gap-4 list-group list-group-flush  shadow p-3 mb-5 bg-body rounded text-sm border-2 border-gray-200">
              <li>Name : { data?.username}</li>
              <li>PhoneNumber : { data?.phonenumber}  </li>
              <li>Adress :{ data?.adress}</li>
              <li>TotalQuantity : {totalQuantity}</li>              
              <li>TotalPrice : {` $ ${totalPrice} `}</li>
           </ul>
           <Button className="text-gray-950 inline-flex items-center md:mb-2 lg:mb-0" variant="outlined" onClick={handleClose}>Confirm Order</Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
