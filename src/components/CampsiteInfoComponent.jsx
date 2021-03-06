import { Component } from 'react';
import {
    Card,
    CardImg,
    CardText,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Label
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

function RenderCampsite({ campsite }) {
    return (
        <div className="col-md-5 m-1">
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                    <CardText>{campsite.description}</CardText>
                </Card>
            </FadeTransform>
        </div>
    );
}

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modal: false,
            rating: '1',
            author: '',
            text: ''
        }

        this.toggle = this.toggle.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    toggle() {
        this.setState({ modal: !this.state.modal })
    }

    handleInputChange(event) {
        const target = event.target
        const name = target.name
        const value = target.value

        this.setState({
            [name]: value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.toggle()
        this.props.postComment(this.props.campsiteId, this.state.rating, this.state.author, this.state.text);
    }

    render() {
        return (
            <>
                <Button outline onClick={this.toggle}><i className="fa fa-pencil fa-lg mr-2"></i>Submit Comment</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select
                                    model=".rating"
                                    id="rating"
                                    name="rating"
                                    placeholder="Rating"
                                    className="form-control"
                                    onChange={this.handleInputChange}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text
                                    model=".author"
                                    id="author"
                                    name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    onChange={this.handleInputChange}
                                    validators={{
                                        required,
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: "Required",
                                        minLength: "Must be at least 2 characters",
                                        maxLength: "Must be 15 characters or less"
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="text">Comment</Label>
                                <Control.textarea
                                    model=".text"
                                    id="text"
                                    name="text"
                                    rows="6"
                                    className="form-control"
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <Button type="submit" color="primary" onClick={this.handleSubmit}>
                                    Submit
                                </Button>
                            </div>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}

function RenderComments({ comments, postComment, campsiteId }) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                <Stagger in>
                    {comments.map(comment =>
                        <Fade in key={comment.id}>
                            <div className="m-3">
                                <span>{comment.text}</span>
                                <br />
                                <span>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</span>
                            </div>
                        </Fade>
                    )}
                </Stagger>
                <CommentForm campsiteId={campsiteId} postComment={postComment} />
            </div>
        );
    }
    return <div />;
}

function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        )
    }
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to="/directory">Directory</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link to="/home">{props.campsite.name}</Link>
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments
                        comments={props.comments}
                        postComment={props.postComment}
                        campsiteId={props.campsite.id}
                    />
                </div>
            </div>
        );
    }
    return <div />;
}

export default CampsiteInfo;