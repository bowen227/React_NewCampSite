import { Component } from 'react';
import { Navbar, NavbarBrand, Jumbotron, Container, Row, Col } from 'reactstrap';

class Header extends Component {
    render() {
        return (
            <>
                <Jumbotron fluid>
                    <Container>
                        <Row>
                            <Col>
                                <h1>NuCamp</h1>
                                <h2>a better way to camp</h2>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
                <Navbar dark sticky="top">
                    <div className="container">
                        <NavbarBrand href="/">NuCamp</NavbarBrand>
                    </div>
                </Navbar>
            </>
        );
    }
}

export default Header;