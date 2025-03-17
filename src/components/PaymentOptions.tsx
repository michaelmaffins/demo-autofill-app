import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

const PaymentOptions = (props: any) => {
  return (
    <>
      <ButtonGroup className="w-100" vertical>
        <Button
          className="text-start"
          variant={props.selectedPayment === 'swish' ? 'secondary' : 'light'}
          name="swish"
          onClick={(e: any) => props.setSelectedPayment(e.target.name)}
        >
          Swish
        </Button>
        <Button
          className="text-start"
          variant={props.selectedPayment === 'invoice' ? 'secondary' : 'light'}
          name="invoice"
          onClick={(e: any) => props.setSelectedPayment(e.target.name)}
        >
          Invoice
        </Button>
        <Button
          className="text-start"
          variant={
            props.selectedPayment === 'installment' ? 'secondary' : 'light'
          }
          name="installment"
          onClick={(e: any) => props.setSelectedPayment(e.target.name)}
        >
          Installment
        </Button>
        <Button
          className="text-start"
          variant={props.selectedPayment === 'card' ? 'secondary' : 'light'}
          name="card"
          onClick={(e: any) => props.setSelectedPayment(e.target.name)}
        >
          Card
        </Button>
      </ButtonGroup>
    </>
  );
};

export default PaymentOptions;
