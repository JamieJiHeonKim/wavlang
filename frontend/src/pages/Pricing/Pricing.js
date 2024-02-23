import { React, useState } from 'react';
import './Pricing.scss';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

const Pricing = () => {
    const [open, setOpen] = useState("p2");
    
    // Task 2: Buttons on Pricing page should direct the user to Login page.
    // If already logged in, take the user to the payment page.
    // Restrict users from sharing accounts, as this could financially hurt me

    return (
        <section className='pricing-section'>
            <div className='pricing-title'>
                <div className="container">
                    <h2>Choosing The Plan</h2>
                    <p>WavLang offers different plans for different usages. Select the plan that is best suitable for you.</p>
                </div>
                <br />
                <br />
                <div className="pricingtable-row" data-aos="fade-up" data-aos-duration="1500">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-duration="2s" data-wow-delay="0.2s">
                            <div className={`${open === "p1" ? "pricingtable-wrapper style-1 m-b30 active" : "pricingtable-wrapper style-1 m-b30"}`} onMouseOver={() => setOpen("p1")}>
                                <div className="pricingtable-inner">
                                    <div className="pricingtable-title">
                                        <h3>Pay As You Go</h3>
                                    </div>
                                    <div className="icon-bx-sm radius bgl-primary">
                                        <div className="icon-cell">
                                            <i className="flaticon-paper-plane"></i>
                                        </div>
                                    </div>
                                    <div className="pricingtable-price">
                                        <h2 className="pricingtable-bx">¢10<small className="pricingtable-type">/minute</small></h2>
                                    </div>
                                    <ul className="pricingtable-features">
                                        <li>Cheapest for Short Audio Files</li>
                                        <li>Great Flexibility</li>
                                        <li>Cost-Effective</li>
                                        <li>No Commitment</li>
                                        <li>Perfect for One-time Users</li>
                                        {/* <li>Important Calls</li>
                                        <li>HTML/CSS</li>
                                        <li>SEO Marketing</li>
                                        <li>Business Analysis</li> */}
                                    </ul>
                                    <div className="pricingtable-footer">
                                        <a href="/pricing-table-2" className="btn start-btn">Start Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-duration="2s" data-wow-delay="0.4s">
                            <div className={`${open === "p2" ? "pricingtable-wrapper style-1 m-b30 active" : "pricingtable-wrapper style-1 m-b30"}`} onMouseOver={() => setOpen("p2")}>
                                <div className="pricingtable-inner">
                                    <div className="pricingtable-title">
                                        <h3>Monthly Plan</h3>
                                    </div>
                                    <div className="icon-bx-sm radius bgl-primary">
                                        <div className="icon-cell">
                                            <i className="flaticon-air-mail"></i>
                                        </div>
                                    </div>
                                    <div className="pricingtable-price">
                                        <h2 className="pricingtable-bx">$6.99<small className="pricingtable-type">/month</small></h2>
                                    </div>
                                    <ul className="pricingtable-features">
                                        <li>No Additional Cost</li>
                                        <li>Reoccurence</li>
                                        <li>Best Value</li>
                                        <li>Unlimited Access</li>
                                        <li>Perfect for Regular Use</li>
                                    </ul>
                                    <div className="pricingtable-footer">
                                        <a href="/pricing-table-2" className="btn start-btn">Start Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-duration="2s" data-wow-delay="0.6s">
                            <div className={`${open === "p3" ? "pricingtable-wrapper style-1 m-b30 active" : "pricingtable-wrapper style-1 m-b30"}`} onMouseOver={() => setOpen("p3")}>
                                <div className="pricingtable-inner">
                                    <div className="pricingtable-title">
                                        <h3>Annual Plan</h3>
                                    </div>
                                    <div className="icon-bx-sm radius bgl-primary">
                                        <div className="icon-cell">
                                            <i className="flaticon-startup"></i>
                                        </div>
                                    </div>
                                    <div className="pricingtable-price">
                                        <h2 className="pricingtable-bx">$59.99<small className="pricingtable-type">/year</small></h2>
                                    </div>
                                    <ul className="pricingtable-features">
                                        <li>No Additional Cost</li>
                                        <li>Reoccurence</li>
                                        <li>Good Value</li>
                                        <li>Unlimited Access All Year</li>
                                        <li>Perfect for Long-term Use</li>
                                    </ul>
                                    <div className="pricingtable-footer">
                                        <a href="/pricing-table-2" className="btn start-btn" >Start Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <br /><br /><br />
                            <p>If you would like to talk about the Enterprise Plan, please contact us at admin@wavlang.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;