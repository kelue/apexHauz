const crypto = require('crypto');

const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const User = require('../models/User');

const { mailClient, MAILGUN_DOMAIN, MAIL_FROM_SENDER, MAIL_FROM_ADDRESS } = require('../utils/mail');

const signInUser = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.genAuthToken();

        res.cookie('authToken', token, {
            httpOnly: true,
            maxAge: 30 * 60 * 1000,
            signed: true,
        });

        res.status(200).json({
            status: 'success',
            data: user,
            token,
        })
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

const signUpUser = async (req, res) => {
    const user = User.build(req.body);
    try {
        await user.save();
        res.status(201).json({
            status: 'success',
            data: user,
        });
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

const signOutUser = async (req, res) => {
    try {
        const token = req.signedCookies.authToken;
        console.log(token);
        if (!token) throw createError(401, 'Not Authenticated!!!');

        res.cookie('authToken', '', {
            expires: new Date(Date.now() - 1000000000000),
        });
        res.status(200).json({
            status: 'success',
            data: {},
        });
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

const sendUserResetPasswordMail = async (req, res) => {
    const email = req.body.email;
    try {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) throw new createError(404, `No record found for ${email}!`);

        const oldToken = await user.getPasswordReset();

        if (oldToken !== null) await oldToken.destroy();

        const token = crypto.randomBytes(8).toString('hex');
        await user.createPasswordReset({ token });

        const userToken = jwt.sign({ email: user.email }, token, { expiresIn: '60m' });

        const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                        <html xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                        <head>
                        <meta name="viewport" content="width=device-width" />
                        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                        <title>Reset Password</title>


                        <style type="text/css">
                        img {
                        max-width: 100%;
                        }
                        body {
                        -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em;
                        }
                        body {
                        background-color: #f6f6f6;
                        }
                        @media only screen and (max-width: 640px) {
                        body {
                            padding: 0 !important;
                        }
                        h1 {
                            font-weight: 800 !important; margin: 20px 0 5px !important;
                        }
                        h2 {
                            font-weight: 800 !important; margin: 20px 0 5px !important;
                        }
                        h3 {
                            font-weight: 800 !important; margin: 20px 0 5px !important;
                        }
                        h4 {
                            font-weight: 800 !important; margin: 20px 0 5px !important;
                        }
                        h1 {
                            font-size: 22px !important;
                        }
                        h2 {
                            font-size: 18px !important;
                        }
                        h3 {
                            font-size: 16px !important;
                        }
                        .container {
                            padding: 0 !important; width: 100% !important;
                        }
                        .content {
                            padding: 0 !important;
                        }
                        .content-wrap {
                            padding: 10px !important;
                        }
                        .invoice {
                            width: 100% !important;
                        }
                        }
                        </style>
                        </head>

                        <body itemscope itemtype="http://schema.org/EmailMessage" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">

                        <table class="body-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
                                <td class="container" width="600" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;" valign="top">
                                    <div class="content" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
                                        <table class="main" width="100%" cellpadding="0" cellspacing="0" itemprop="action" itemscope itemtype="http://schema.org/ConfirmAction" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;" bgcolor="#fff"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top">
                                                    <meta itemprop="name" content="Reset Password" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;" /><table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                                                Please reset your password by clicking the link below. Link valid for only 1 hour.
                                                            </td>
                                                        </tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                                                Contact support immediately if you didn't make the request.
                                                            </td>
                                                        </tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" itemprop="handler" itemscope itemtype="http://schema.org/HttpActionHandler" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                                                <a href="http://localhost:3000/api/v2/auth/reset-password?email=${user.email}&token=${userToken}" class="btn-primary" itemprop="url" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #348eda; margin: 0; border-color: #348eda; border-style: solid; border-width: 10px 20px;">Reset password</a>
                                                            </td>
                                                        </tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                                                &copy; Ahmadinjo @ Side Hustle Cohort 5.0
                                                            </td>
                                                        </tr></table></td>
                                            </tr></table><div class="footer" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;">
                                            <table width="100%" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="aligncenter content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; vertical-align: top; color: #999; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top">Follow <a href="http://twitter.com/ahmadinjo" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; color: #999; text-decoration: underline; margin: 0;">@ahmadinjo</a> on Twitter.</td>
                                                </tr></table></div></div>
                                </td>
                                <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
                            </tr></table></body>
                        </html>`;

        const mailResult = await mailClient.messages.create(MAILGUN_DOMAIN, {
            from: `${MAIL_FROM_SENDER} <${MAIL_FROM_ADDRESS}>`,
            to: [user.email],
            subject: "Reset Password",
            text: `Dear ${user.first_name}, please use this link to reset your password - http://localhost:3000/api/v2/auth/reset-password?email=${user.email}&token=${userToken}`,
            html: html,
        })

        res.status(200).json({
            status: 'success',
            data: mailResult,
        })

    } catch (error) {
        console.log(error);
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

const resetUserPassword = async (req, res) => {
    const email = req.body.email;
    const token = req.body.token;

    try {
        const user = await User.findOne({
            where: {
                email
            },
        })
        if (!user) throw new createError(404, 'User not found!');

        const dbToken = await user.getPasswordReset();
        if (!dbToken) throw new createError(403, 'Password reset failed!');

        const decodedPayload = jwt.verify(token, dbToken.token);
        if (user.email !== decodedPayload.email) throw new createError(403, 'Password request failed!');

        user.password = req.body.password;

        const newUser = await user.save();
        await dbToken.destroy();

        res.status(200).json({
            status: 'success',
            data: {
                message: 'password reset successful',
            }
        })

    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

module.exports = {
    signInUser,
    signUpUser,
    signOutUser,
    sendUserResetPasswordMail,
    resetUserPassword,
}