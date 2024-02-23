import {useNavigate} from 'react-router-dom'
import {Badge, Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import {FaShoppingCart, FaUser} from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice';
import {logout} from '../slices/authSlice'
import SearchBox from './SearchBox';
import {LinkContainer} from 'react-router-bootstrap'
import { resetCart } from '../slices/cartSlice';
//import logo from '../assets/logo.png'

const Header = () => {
    const {cartItems} = useSelector((state) => state.cart)
    const {userInfo} = useSelector((state) => state.auth)
  
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation()

    const logoutHandler = async () =>{
        try{
            await logoutApiCall().unwrap()
            dispatch(logout())
            dispatch(resetCart());
            navigate('/login')
        } catch(err){
            console.log(err)
        }
    }
    return (
    <header>
        <Navbar bg ="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>
                        {/* (I dont have the logo image file for this) <img src={logo} alt='ProShop' />*/}
                        ProShop
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='ms-auto'>
                        <SearchBox />
                        <LinkContainer to='/cart'>
                            <Nav.Link>
                                <FaShoppingCart /> Cart
                                {
                                    cartItems.length > 0 && (
                                        <Badge pill bg='success' style={{marginLeft: '5px'}}>
                                            { cartItems.reduce((acumulator, currentItem) => acumulator + currentItem.qty, 0)}
                                        </Badge>
                                    )
                                }
                            </Nav.Link>
                        </LinkContainer>
                        {userInfo ? (
                            <>
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <LinkContainer to='/login'>
                            <Nav.Link>
                                <FaUser /> Sign In
                            </Nav.Link>
                            </LinkContainer>
                        )}
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Admin' id='adminmenu'>
                                <LinkContainer to='/admin/productlist'>
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to='/admin/orderlist'>
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header