import Modal from 'react-bootstrap/Modal';


const AddMission = ({ show, onHide, hide }) => {
    return <Modal show={show} onHide={onHide} dialogClassName='showDialog' centered={true} size='xl' >
            <Modal.Header className='border-0' closeButton>
                <Modal.Title className='text-sm fw-bold'>Add new mession</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="row row-gap-3">
                <div className="col-md-6">
                    <div className="card border-0">
                        <div className="card-body">
                            <div class="mb-3">
                                <label for="" class="form-label fw-semibold">Title</label>
                                <input type="text" class="form-control border-black" name="title" id="title-input" placeholder="Enter Title" />
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label fw-semibold">Start Time</label>
                                <input type="text" class="form-control border-black" name="start-time" id="start-time-input" placeholder="starting Time" />
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label fw-semibold">End Time</label>
                                <input type="text" class="form-control border-black" name="end-time" id="end-time-input" placeholder="end Time" />
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label fw-semibold">Status Choise</label>
                                <select class="form-select border-black" name="status"  id="status-select">
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
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card border-0">
                        <div className="card-body">
                            <div class="mb-3">
                                <label for="" class="form-label fw-semibold">Status</label>
                                <input type="text" class="form-control border-black" name="status-in" id="status-input" placeholder="pending" />
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label fw-semibold">Expected arrival</label>
                                <input type="text" class="form-control border-black" name="arrival" id="arrival-input" placeholder="arrival" />
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label fw-semibold">Requester ID</label>
                                <input type="text" class="form-control border-black" name="req-id" id="requester-id-input" placeholder="ID" />
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label fw-semibold">Requeste Time</label>
                                <input type="text" class="form-control border-black" name="req-time-id" id="requeste-time-input" placeholder="request time" />
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label fw-semibold">Description</label>
                                <textarea class="form-control border-black" name="req-time-id" rows={5} id="description-input" placeholder="description"></textarea>
                            </div>
                        </div>
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

export default AddMission;
