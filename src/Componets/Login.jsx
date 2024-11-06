import React from "react";
import Radio from "@mui/material/Radio";
import { Link } from "react-router-dom";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { auth, db, storage } from "../Firebase/Authentication";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Avatar } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [errorMessage, setError] = useState("");
  const [loading , setLoading] = useState(false)
  // const navigate = useNavigate();

  const notify = () => toast("");

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const {
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    resetForm,
    handleChange,
    handleBlur,
    isSubmitting,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      image: "",
      phonenumber: "",
      adress: "",
      radio: "",
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .min(4, "username must be 4 or more")
        .max(10, "username must be 10 or less")
        .required("username is required"),
      password: Yup.string()
        .min(4, "password must be 4 or more")
        .max(10, "password must be 10 or less")
        .required("password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      email: Yup.string()
        .email("Invalid email address")
        .matches(
          /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
          "Invalid email address "
        )
        .required("Email is required"),
      image: Yup.mixed().required("required"),
      phonenumber: Yup.string()
        .min(12, "number must be 12")
        .matches(
          /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm,
          "number must be valid 920-1234567890"
        )
        .required("required"),
      adress: Yup.string().required("required"),
      radio: Yup.string().required("Gender is required"),
    }),

    onSubmit: (value) => {
      // console.log(value);
        setLoading(true)
      createUserWithEmailAndPassword(auth, value.email, value.password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          // console.log(user.uid);

          try {
            const imageRef = ref(storage, `images/${value.image.name}`);
            // console.log(imageRef);

            const uploadTask = await uploadBytesResumable(
              imageRef,
              value.image
            );
            const downloadURL = await getDownloadURL(uploadTask.ref);
            value.image = downloadURL; // The image URL is ready to be saved in Firestore
            // console.log(downloadURL);

            // Use setDoc to store user data with `uid` as document ID
            const docRef = await setDoc(doc(db, "users", user.uid), {
              username: value.username,
              email: value.email,
              password: value.password, // consider not saving the password directly
              phonenumber: value.phonenumber,
              adress: value.adress,
              radio: value.radio,
              image: downloadURL, // Save the URL in the document
              uid: user.uid,
            });

            console.log("User data written successfully");
            notify('success', 'Signup Successful');

            resetForm({ values: "" });
            setLoading(false)
            // navigate("/home");
          } catch (error) {
            console.error("Error uploading image or saving document: ", error);
            setError(error.message);
          }
        })
        .catch((error) => {
          const errorMessage = error.message;
          notify('error', errorMessage);
        });
    },
  });

  const handleChangeImage = (event) => {
    // let file = event.target.files[0];
    // var reader = new FileReader();
    // reader.onload = function (e) {
    //   console.log(e.target.result); // Base64 string of the image
    // };
    // reader.readAsDataURL(file); // Reading the image file as a data URL
    setFieldValue("image", event.currentTarget.files[0]);
  };

  return (
    <div className="w-full ">
      <div className="flex items-center justify-center w-full">
        <ToastContainer />
        <form onSubmit={handleSubmit} className="w-1/2 mx-auto">
          {/* Username Input */}
          <div className="relative z-0 w-full mt-10 group">
            <input
              type="text"
              name="username"
              id="username"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            <label
              htmlFor="username"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Username
            </label>
            <p className="text-red-500 mt-2 mb-2">
              {errors.username && touched.username && errors.username}
            </p>
          </div>

          {/* Email Input */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email Address
            </label>
            <p className="text-red-500 mt-2 mb-2">
              {errors.email && touched.email && errors.email}
            </p>
          </div>

          {/* Password Input */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            <p className="text-red-500 mt-2 mb-2">
              {errors.password && touched.password && errors.password}
            </p>
          </div>

          {/* image Uploade */}

          <div className="flex items-center gap-4 mb-5 group">
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload files
              <VisuallyHiddenInput
                // value={undefined}
                name="image"
                type="file"
                onChange={(event) => handleChangeImage(event)}
                multiple
              />
            </Button>

            <Avatar
              alt="Remy Sharp"
              src={values.image ? URL.createObjectURL(values.image) : ""}
              sx={{ width: 50, height: 50 }}
            />

            <p className="text-red-500 mt-2 mb-2">
              {errors.image && touched.image && errors.image}
            </p>
          </div>

          {/* Address Input */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="adress"
              id="adress"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.adress}
            />
            <label
              htmlFor="adress"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Address
            </label>
            <p className="text-red-500 mt-2 mb-2">
              {errors.adress && touched.adress && errors.adress}
            </p>
          </div>

          {/* Radio Input for Gender */}
          <div className="mb-5">
            <FormControl
              component="fieldset"
              error={Boolean(touched.radio && errors.radio)}
            >
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                name="radio"
                value={values.radio}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
              <p className="text-red-500 mt-2 mb-2">
                {errors.radio && touched.radio && errors.radio}
              </p>
            </FormControl>
          </div>

          {/* Phone Number Input */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phonenumber"
              id="phonenumber"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phonenumber}
            />
            <label
              htmlFor="phonenumber"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              PhoneNumber
            </label>
            <p className="text-red-500 mt-2 mb-2">
              {errors.phonenumber && touched.phonenumber && errors.phonenumber}
            </p>
          </div>

          {/* Submit Button */}
          <Button
            variant="contained"
            size="large"
            // disabled={isSubmitting}
            loading={isSubmitting}
            onLoad={handleSubmit}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </Button>
        </form>
      </div>
      <p className="text-sm mt-4 text-gray-400  text-center">
        Already have an account?{" "}
        <Link to="/signup" className="text-blue-500">
          SignUp
        </Link>
      </p>
      <p className="text-center text-xl mt-4 text-red-500">{errorMessage}</p>
    </div>
  );
}

export default Login;
