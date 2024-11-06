import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Badge } from "antd";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Link } from "react-router-dom"; // Ensure this is imported
import { useSelector } from "react-redux";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { auth } from "../Firebase/Authentication";
import { signOut } from "firebase/auth";
import { db } from "../Firebase/Authentication";
import { useSearchProductsQuery } from "../Redux/ProductApis";
const pages = ["Home"];
function Navbar() {
  const [data, setData] = useState({});
  const cartItems = useSelector(
    (state) => state.persistedReducer.ProductList.value
  );

  const userInfo = useSelector((state) => state.persistedReducer.onAuth);

  useEffect(() => {
    if (userInfo?.user?.uid) {
      const fetchUserData = async () => {
        try {
          const docRef = doc(db, "users", userInfo.user.uid); // Fetch the document by uid
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            setData(docSnap.data()); // Set fetched data to state
          }
        } catch (error) {
          // console.error("Error fetching document:", error);
        }
      };

      fetchUserData();
    }
  }, [userInfo]);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // setAnchorElUser(null);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));


  return (
    <AppBar position="">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  {/* Add Link to Menu Items */}
                  <Link
                    to={`/${page.toLowerCase()}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {/* Add Link to Button */}
                <Link
                  to={`/${page.toLowerCase()}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {page}
                </Link>
              </Button>
            ))}
          </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              
              sx={{ flexGrow: 1 }}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box
            sx={{
              flexGrow: 0,
              marginLeft: 3,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            <Link
              to="/cart"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Tooltip title="Add to cart">
                <IconButton color="inherit">
                  <Badge count={cartItems.length} color="#0E93B4">
                    <ShoppingCartIcon
                      sx={{
                        color: "white",
                        fontSize: 30,
                        cursor: "pointer",
                        transition: "all 0.3s ease-in-out",
                        "&:hover": { transform: "scale(1.2)" },
                      }}
                    />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0, marginLeft: 3 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={
                    userInfo.isLogin
                      ? data.image
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>

              <MenuItem onClick={handleCloseUserMenu}>
                <Link textAlign="center" to="/login">
                  Login
                </Link>
              </MenuItem>

              <MenuItem onClick={handleCloseUserMenu}>
                <Typography onClick={handleLogout} textAlign="center">
                  SignOut
                </Typography>
              </MenuItem>
            </Menu>
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
