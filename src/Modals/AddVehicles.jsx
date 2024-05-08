import Modal from 'react-bootstrap/Modal';


const AddVehicles = ({ show, onHide, hide }) => {
    return <Modal show={show} onHide={onHide} dialogClassName='showDialog' centered={true} size='lg' >
            <Modal.Header className='border-0' closeButton>
                <Modal.Title className='text-sm fw-bold'>Add new vehicle</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="row row-gap-3">
                    <div className="col-md-6">
                        <div class="">
                            <label for="" class="form-label fw-semibold text-sm">Vehicle ID</label>
                            <input type="text" class="form-control" name="fname" id="fname-input" placeholder=" " />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div class="">
                            <label for="" class="form-label fw-semibold text-sm">Age</label>
                            <input type="text" class="form-control" name="lname" id="lname-input" placeholder=" " />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div class="">
                            <label for="" class="form-label fw-semibold text-sm">Type</label>
                            <input type="text" class="form-control" name="phone" id="phone-input" placeholder=" " />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div class="">
                            <label for="" class="form-label fw-semibold text-sm">Status Choise</label>
                            <select class="form-select" name="status"  id="status-select">
                                <option selected>Select</option>
                                <option value="On Going">On Going</option>
                                <option value="Arrived">Arrived</option>
                                <option value="OverDue">OverDue</option>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div class="">
                            <label for="" class="form-label fw-semibold text-sm">Model</label>
                            <input type="text" class="form-control" name="role" id="role-input" placeholder=" " />
                        </div>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer className='border-0'>
                {/* <Button variant="secondary">Close</Button> */}
                {/* <Button variant="primary">Save changes</Button> */}
                <button className="btn btn-outline-secondary px-3 py-2 mt-3" onClick={() => hide()}>Close</button>
                <button className="btn btn-main px-3 py-2 mt-3">Add</button>
            </Modal.Footer>
    </Modal>
}

export default AddVehicles;
