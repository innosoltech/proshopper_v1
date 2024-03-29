import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
  // const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [paymentMethod, setPaymentMethod] = useState("Card");
  // console.log(paymentMethod);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  function submitHandler(event) {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              className="my-2"
              label="Card (debit/credit/prepaid)"
              id="Card"
              name="paymentMethod"
              value="Card"
              checked
              onChange={(event) => {
                setPaymentMethod(event.target.value);
              }}
            ></Form.Check>
          </Col>

          {/* <Col>
            <Form.Check
              type="radio"
              className="my-2"
              label="PayPal or Credit/Debit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(event) => setPaymentMethod(event.target.value)}
            ></Form.Check>
          </Col> */}

          {/* <Col>
            <Form.Check
              type="radio"
              className="my-2"
              label="Mobile Money"
              id="mobileMoney"
              name="paymentMethod"
              value="Mobile Money"
              onChange={(event) => setPaymentMethod(event.target.value)}
            ></Form.Check>
          </Col> */}
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
