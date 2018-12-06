import React from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import { Link } from "react-router-dom";
import styles from "../CSS/error.styl";
function NotFound() {
  return (
    <Grid fluid>
      <Row center="xs">
        <Col xs={12}>
          <div>
            <h1 className={styles["title"]}>404</h1>
            <h2 className={styles["sub-title"]}>Page Not Found</h2>
            <p>
              Looks like this page is empty....Have no fear! There is a way out!
            </p>
            <Link to="/" className={styles["btn-link"]}>
              Home
            </Link>
          </div>
        </Col>
      </Row>
    </Grid>
  );
}
export default NotFound;
