import { Link } from 'react-router-dom';
import './homepage.css';
import hero from './logo/hero.png';
import tab1 from './logo/tab1.png';
import logo from './logo/logo bee.png'
import { useEffect, useRef, useState } from 'react';
import { urlRouter } from 'src/utils/constants';

const Homepage = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsNavExpanded(false)
      }
    }
    document.addEventListener("click", handleClickOutside, false);
  }, [ref])
  return (
    <>
      <nav ref={ref} className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div>
                <Link to="/lading-page" className="flex items-center py-4 px-2">
                  <img src={logo} alt="Logo" className="h-12 w-16 " />
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-3 ">
              <Link to={`/${urlRouter.AUTH}`} className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Log In</Link>
              <Link to={`/${urlRouter.AUTH}`} className="py-2 signIn px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">Sign Up</Link>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsNavExpanded(!isNavExpanded)} className="outline-none mobile-menu-button">
                <svg className=" w-6 h-6 text-gray-500 hover:text-green-500 " x-show="!showMenu" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button >
            </div>
          </div>
        </div>
        {isNavExpanded && (
          <div className={isNavExpanded ? "showmenu" : "hidden"}>
            <ul >
              {/* "hidden mobile-menu" */}
              <li><Link to="index.html" className="block text-sm px-2 py-4 text-white bg-green-500 font-semibold">Home</Link></li>
              <li><Link to="#services" className="block text-sm signIn px-2 py-4 hover:bg-green-500 transition duration-300">Services</Link></li>
              <li><Link to="#about" className="block text-sm signIn px-2 py-4 hover:bg-green-500 transition duration-300">About</Link></li>
              <li><Link to="#contact" className="block text-sm signIn px-2 py-4 hover:bg-green-500 transition duration-300">Contact Us</Link></li>
              <li><Link to={`/${urlRouter.AUTH}`} className="block text-sm signIn px-2 py-4 hover:bg-green-500 transition duration-300">Đăng Nhập</Link></li>
            </ul>
          </div>
        )}
      </nav>
      <div className='content-container'>
        <section>
          <div className='container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 mt-14 lg:mt-28'>
            <div className='flex flex-1 flex-col items-center lg:items-start'>
              <h2 className='text-bookmark-blue text-3xl md:text-4 lg:text-5xl text-center lg:text-left mb-6 sm:text-center'>
                Phần mềm quản lý nhà trọ
              </h2>
              <p className='text-bookmark-grey text-lg text-center lg:text-left mb-6'>
                Được ra đời dựa vào nhu cầu thực tế của các cá nhân, tổ chức cho thuê nhà, phòng trọ, chung cư mini. Ứng
                dụng quản lý phòng trọ được phát triển giúp cho người quản lý tính toán chính xác tiền phòng, dịch vụ,
                tiết kiệm thời gian ghi chép, thống kê.
              </p>
              <div className='flex justify-center flex-wrap gap-6'>
                <Link to={`/${urlRouter.AUTH}`} className='rounded-lg px-4 py-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-blue-100 duration-300'>
                  Đăng kí ngay
                </Link>
              </div>
            </div>
            <div className='flex justify-center flex-1 mb-10 md:mb-16 lg:mb-0 z-10'>
              <img className='w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full' src={hero} alt='' />
            </div>
          </div>
        </section>
        <section className='py-20 mt-20 lg:mt-32'>
          <div data-aos='fade-up' className='bg-slate-200 py-3'>
            <div className='sm:w-3/4 lg:w-5/12 mx-auto px-2'>
              <h1 className='mb-4 text-2xl font-extrabold leading-none tracking-tight text-black md:text-4xl lg:text-4xl dark:text-black sm:text-center'>
                Tính năng của trang web
              </h1>
            </div>
            <div className='relative mt-10 lg:mt-20'>
              <div className='container mx-auto flex flex-col lg:flex-row justify-center gap-x-24'>
                <div className='flex flex-1 justify-center z-10 mb-10 lg:mb-0' data-aos="fade-right">
                  <img className='w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full' src={tab1} alt='' />
                </div>
                <div className='flex flex-1 flex-col items-center lg:items-start'>
                  <h1 className='text-3xl text-bookmark-blue' data-aos="fade-left" data-aos-offset="200"
                    data-aos-easing="ease-in-sine">Tính năng cơ bản</h1>
                  <ul className='list-disc ml-8' data-aos="fade-left" data-aos-offset="200"
                    data-aos-easing="ease-in-sine">
                    <li className='py-3 text-xl' data-aos="fade-left" data-aos-offset="200"
                      data-aos-easing="ease-in-sine">Nhập chỉ số điện, nước, dịch vụ, tính tiền phòng</li>
                    <li className='py-3 text-xl' data-aos="fade-left" data-aos-offset="200"
                      data-aos-easing="ease-in-sine">
                      Sử dụng được trên tất cả các thiết bị khác nhau như laptop, PC, tablet, mobile
                    </li>
                    <li className='py-3 text-xl' data-aos="fade-left" data-aos-offset="200"
                      data-aos-easing="ease-in-sine">
                      Sử dụng được trên các hệ điều hành khác nhau như Window, linux, iOS, Android
                    </li>
                  </ul>
                  <button data-aos="fade-left" data-aos-offset="200"
                    data-aos-easing="ease-in-sine" className='rounded-lg px-4 py-2 border-2 border-purple-500 text-blue-500 hover:bg-purple-500 hover:text-white duration-300'>
                    Xem thêm
                  </button>
                </div>
              </div>
              <div
                className='
            hidden
            lg:block
            overflow-hidden
            bg-purple-400
            rounded-r-full
            absolute
            h-80
            w-2/4
            -bottom-24
            -left-44
          '
              ></div>
            </div>
          </div>
        </section>
        <section className='max-w-8xl mx-auto container bg-white pt-16'>
          <div data-aos='fade-up'>
            <div role='contentinfo' className='flex items-center flex-col px-4'>
              <h1
                tabIndex={0}
                className='focus:outline-none text-4xl lg:text-4xl font-extrabold text-center leading-10 text-gray-800 lg:w-5/12 md:w-9/12 pt-4'
              >
                Quản Lý Thông Tin &amp; Công Việc Một Cách Hiệu Quả Với Phần Mềm Chuyên Nghiệp
              </h1>
            </div>
            <div
              tabIndex={0}
              aria-label='group of cards'
              className='focus:outline-none mt-20 flex flex-wrap justify-center gap-10 px-4'
            >
              <div tabIndex={0} data-aos="fade-right" data-aos-offset="200" aria-label='card 1' className='focus:outline-none flex sm:w-full md:w-5/12 pb-20'>
                <div className='w-20 h-20 relative mr-5'>
                  <div className='absolute top-0 right-0 bg-indigo-100 rounded w-16 h-16 mt-2 mr-1' />
                  <div className='absolute text-white bottom-0 left-0 bg-indigo-700 rounded w-16 h-16 flex items-center justify-center mt-2 mr-3'>
                    <img src='https://tuk-cdn.s3.amazonaws.com/can-uploader/icon_and_text-SVG1.svg' alt='drawer' />
                  </div>
                </div>
                <div className='w-10/12' >
                  <h2 tabIndex={0} className='focus:outline-none text-lg font-bold leading-tight text-gray-800'>
                    Tiết kiệm thời gian và tăng hiệu suất làm việc
                  </h2>
                  <p tabIndex={0} className='focus:outline-none text-base text-gray-600 leading-normal pt-2'>
                    Phần mềm quản lý giúp tổ chức thông tin và công việc một cách có hệ thống, giúp tiết kiệm thời gian
                    tìm kiếm thông tin và dễ dàng quản lý công việc hàng ngày.
                  </p>
                </div>
              </div>
              <div tabIndex={0} data-aos="fade-left" data-aos-offset="200" aria-label='card 2' className='focus:outline-none flex sm:w-full md:w-5/12 pb-20'>
                <div className='w-20 h-20 relative mr-5'>
                  <div className='absolute top-0 right-0 bg-indigo-100 rounded w-16 h-16 mt-2 mr-1' />
                  <div className='absolute text-white bottom-0 left-0 bg-indigo-700 rounded w-16 h-16 flex items-center justify-center mt-2 mr-3'>
                    <img src='https://tuk-cdn.s3.amazonaws.com/can-uploader/icon_and_text-SVG2.svg' alt='check' />
                  </div>
                </div>
                <div className='w-10/12' >
                  <h2 tabIndex={0} className='focus:outline-none text-lg font-semibold leading-tight text-gray-800'>
                    Quản lý tài nguyên hiệu quả
                  </h2>
                  <p tabIndex={0} className='focus:outline-none text-base text-gray-600 leading-normal pt-2'>
                    Phần mềm quản lý giúp theo dõi tài nguyên như thời gian, nguồn lực, và ngân sách. Điều này giúp đảm
                    bảo rằng các dự án được quản lý một cách hiệu quả và tiết kiệm tài nguyên.
                  </p>
                </div>
              </div>
              <div tabIndex={0} data-aos="fade-right" data-aos-easing="ease-in-sine" aria-label='card 3' className='focus:outline-none flex sm:w-full md:w-5/12 pb-20'>
                <div className='w-20 h-20 relative mr-5'>
                  <div className='absolute top-0 right-0 bg-indigo-100 rounded w-16 h-16 mt-2 mr-1' />
                  <div className='absolute text-white bottom-0 left-0 bg-indigo-700 rounded w-16 h-16 flex items-center justify-center mt-2 mr-3'>
                    <img src='https://tuk-cdn.s3.amazonaws.com/can-uploader/icon_and_text-SVG3.svg' alt='html tag' />
                  </div>
                </div>
                <div className='w-10/12' >
                  <h2 tabIndex={0} className='focus:outline-none text-lg font-semibold leading-tight text-gray-800'>
                    Dễ dàng mở rộng và tích hợp
                  </h2>
                  <p tabIndex={0} className='focus:outline-none text-base text-gray-600 leading-normal pt-2'>
                    Một số phần mềm quản lý cho phép tích hợp với các công cụ khác như email, lịch và các ứng dụng làm
                    việc phổ biến khác. Điều này giúp tạo sự liên kết và khả năng mở rộng tính năng.
                  </p>
                </div>
              </div>
              <div tabIndex={0} data-aos="fade-left" data-aos-easing="ease-in-sine" aria-label='card 4' className='focus:outline-none flex sm:w-full md:w-5/12 pb-20'>
                <div className='w-20 h-20 relative mr-5'>
                  <div className='absolute top-0 right-0 bg-indigo-100 rounded w-16 h-16 mt-2 mr-1' />
                  <div className='absolute text-white bottom-0 left-0 bg-indigo-700 rounded w-16 h-16 flex items-center justify-center mt-2 mr-3'>
                    <img src='https://tuk-cdn.s3.amazonaws.com/can-uploader/icon_and_text-SVG4.svg' alt='monitor' />
                  </div>
                </div>
                <div className='w-10/12' >
                  <h2 tabIndex={0} className='focus:outline-none text-lg font-semibold leading-tight text-gray-800'>
                    Tổ chức và quản lý thông tin
                  </h2>
                  <p tabIndex={0} className='focus:outline-none text-base text-gray-600 leading-normal pt-2'>
                    Các công cụ quản lý thường có tính năng lưu trữ và tổ chức thông tin một cách cấu trúc. Điều này giúp
                    tránh mất thông tin quan trọng và tạo điều kiện để dễ dàng tìm kiếm lại khi cần.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div
            data-aos='fade-up'
            className='p-6 container mx-auto md:w-2/3 xl:w-auto flex flex-col xl:items-stretch justify-between xl:flex-row'
          >
            <div className='xl:w-1/2 md:mb-14 xl:mb-0 relative h-auto flex items-center justify-center'>
              <img
                src='https://cdn.tuk.dev/assets/components/26May-update/newsletter-1.png'
                alt='Envelope with a newsletter'
                role='img'
                className='h-full xl:w-full lg:w-1/2 w-full '
              />
            </div>
            <div className='w-full xl:w-1/2 xl:pl-40 xl:py-28 '>
              <h1 className='text-2xl md:text-4xl xl:text-5xl font-bold leading-10 text-gray-800 mb-4 text-center xl:text-left md:mt-0 mt-4'>
                Đăng kí
              </h1>
              <p className='text-base leading-normal text-gray-600 text-center xl:text-left'>
                Nếu bạn muốn trải nghiệm và nhận được thông báo mới nhất từ chúng tôi
              </p>
              <div className='flex items-stretch mt-12'>
                <input
                  className='bg-gray-100 rounded-lg rounded-r-none text-base leading-none text-gray-800 p-5 w-4/5 border border-transparent focus:outline-none focus:border-gray-500'
                  type='email'
                  placeholder='Email của bạn'
                />
                <button className='w-32 rounded-l-none hover:bg-indigo-600 bg-indigo-700 rounded text-base font-medium leading-none text-white p-5 uppercase focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700'>
                  Đăng kí
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className='bg-bookmark-blue py-8'>
        <div className='container mx-auto flex flex-col md:flex-row items-center'>
          <div className='flex flex-1 flex-wrap items-center justify-center md:justify-start gap-12'>
            {/* <img src='./imgs/logo-bookmark-white.png' alt='' /> */}
            <ul className='flex text-white uppercase gap-12 text-xs'>
              <li className='cursor-pointer'>Giới thiệu</li>
              <li className='cursor-pointer'>Báo cáo</li>
              <li className='cursor-pointer'>Liên hệ</li>
            </ul>
          </div>
          <div className='flex gap-10 mt-12 md:mt-0'>
            <li className='list-none'>
              <i className='text-white text-2xl fab fa-twitter'></i>
            </li>
            <li className='list-none'>
              <i className='text-white text-2xl fab fa-facebook-square'></i>
            </li>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Homepage;
