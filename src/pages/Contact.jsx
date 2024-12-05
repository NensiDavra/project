import { Card, Input, Button, Form } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import "../styles/Contact.css";

function Contact() {
  return (
    <div className="contact-container">
      {/* <h1>Contact Us</h1> */}
      <div className="contact-background">
        <div className="information">
          <h1>Contact Information</h1>
          <p>
            We’re thrilled to connect with you! Whether you have questions, need
            assistance, or want to explore our digital marketing software
            solutions, our team is here to help. Reach out to us via the
            following channels:
          </p>
          <p>
            <PhoneOutlined />
            <b>Phone: </b>+91 99999-99999
          </p>
          <p>
            <MailOutlined />
            <b>Email: </b>abc@gmail.com
          </p>
          <p>
            <EnvironmentOutlined />
            <b>Our Location: </b>India
          </p>
        </div>
        <Card className="contact-card" title="Contact Us" bordered={true}>
          <Form layout="horizontal">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Input placeholder="Enter Your Name" />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please your phone number!" }]}
            >
              <Input placeholder="Enter Your Phone number" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please Enter a Valid Email!" },
              ]}
            >
              <Input placeholder="Enter Your Email" />
            </Form.Item>
            <Form.Item
              label="Message"
              name="message"
              rules={[{ required: true, message: "Please Enter Message" }]}
            >
              <Input.TextArea placeholder="Enter your Message Here..." />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "10px" }}
            >
              Submit
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default Contact;
