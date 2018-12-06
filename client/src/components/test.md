<Grid>
        <Row center="xs">
          <Col xs={12} lg={8}>
            <Form className={styles["login-form"]}>
              <h1 className={styles["form-title"]}>Login</h1>
              <Form.Field>
                <label className={styles["input-label"]} htmlFor="email">
                  Email
                </label>
                <input
                  name="email"
                  placeholder="email"
                  className={styles["form-input"]}
                />
              </Form.Field>
              <Form.Field>
                <label className={styles["input-label"]} htmlFor="password">
                  Password
                </label>
                <input
                  name="password"
                  placeholder="password"
                  className={styles["form-input"]}
                />
              </Form.Field>
              <div className={styles["form-btn-wrap"]}>
                <button
                  className={styles["form-btn"] + " ui button"}
                  role="button"
                >
                  Login
                </button>
                <Link to="/register" className="ui button" role="button">
                  Register
                </Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Grid>
