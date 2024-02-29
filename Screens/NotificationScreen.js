// // import React, { useState } from 'react';
// // import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Modal } from 'react-native';
// // import Header from '../Components/Header';

// // const NotificationScreen = () => {
// //     const wordLimit = 10;
// //     const [notifications, setNotifications] = useState([
// //         {
// //             id: 1,
// //             restaurantName: 'KFC',
// //             content: 'Your order has been successfully placed. You will get your order as soon as possible.',
// //             time: '2 hours ago',
// //         },
// //         {
// //             id: 2,
// //             restaurantName: 'Cheezious',
// //             content: 'Your order has been successfully placed. You will get your order as soon as possible.',
// //             time: '2 hours ago',
// //         },
// //         {
// //             id: 3,
// //             restaurantName: 'Macdonalds',
// //             content: 'Your order has been successfully placed. You will get your order as soon as possible.',
// //             time: '2 hours ago',
// //         },
// //         {
// //             id: 4,
// //             restaurantName: 'Dawat',
// //             content: 'Your order has been successfully placed. You will get your order as soon as possible.',
// //             time: '2 hours ago',
// //         },
// //         {
// //             id: 5,
// //             restaurantName: 'Cahye Kahan',
// //             content: 'Your order has been successfully placed. You will get your order as soon as possible.',
// //             time: '2 hours ago',
// //         },
// //         {
// //             id: 6,
// //             restaurantName: 'KFC',
// //             content: 'Your order has been successfully placed. You will get your order as soon as possible.',
// //             time: '2 hours ago',
// //         },
        
// //         // Add more notifications as needed
// //     ]);

// //     const [selectedNotification, setSelectedNotification] = useState(null);
// //     const [isModalVisible, setModalVisible] = useState(false);

// //     const openNotification = (notification) => {
// //         setSelectedNotification(notification);
// //         setModalVisible(true);
// //     };

// //     const deleteNotification = (notification) => {
// //         setNotifications((prevNotifications) =>
// //             prevNotifications.filter((item) => item.id !== notification.id)
// //         );
// //         setModalVisible(false);
// //     };
// //     const truncateText = (text, wordLimit) => {
// //         const words = text.split(' ');
// //         if (words.length > wordLimit) {
// //           return words.slice(0, wordLimit).join(' ') + '...'; // Append ellipsis for truncated text
// //         }
// //         return text;
// //       };

// //     return (
// //         <View style={styles.container}>
// //              <Header />
// //             <ScrollView>
// //                 {notifications.map((notification) => (
// //                     <TouchableOpacity
// //                         key={notification.id}
// //                         style={styles.notificationContainer}
// //                         onPress={() => openNotification(notification)}
// //                     >
// //                         <Text style={styles.notificationTitle}>{notification.restaurantName}</Text>
// //                         <Text style={styles.notificationContent}>{truncateText(notification.content, wordLimit)}</Text>
// //                         <Text style={styles.notificationTime}>{notification.time}</Text>
// //                     </TouchableOpacity>
// //                 ))}
// //             </ScrollView>
// //             <Modal visible={isModalVisible} animationType="slide">
// //                 <View style={styles.modalContainer}>
// //                     {selectedNotification && (
// //                         <View>
// //                             <Text style={styles.modalTitle}>{selectedNotification.restaurantName}</Text>
// //                             <Text style={styles.modalContent}>{selectedNotification.content}</Text>
// //                             <Text style={styles.modalTime}>{selectedNotification.time}</Text>
// //                             <TouchableOpacity
// //                                 style={styles.deleteButton}
// //                                 onPress={() => deleteNotification(selectedNotification)}
// //                             >
// //                                 <Text style={styles.deleteButtonText}>Delete</Text>
// //                             </TouchableOpacity>
// //                         </View>
// //                     )}
// //                     <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
// //                         <Text style={styles.closeButtonText}>Close</Text>
// //                     </TouchableOpacity>
// //                 </View>
// //             </Modal>
// //         </View>
// //     );
// // };



// import React, { useState, useEffect } from 'react';
// import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Modal } from 'react-native';
// import Header from '../Components/Header';

// const NotificationScreen = () => {
//     const wordLimit = 10;
//     const [notifications, setNotifications] = useState([
//         {
//             id: 1,
//             restaurantName: 'KFC',
//             content: 'Your order has been successfully placed. You will get your order as soon as possible.',
//             time: new Date(Date.now() + 6 * 60 * 1000).toISOString(), // Replace with your desired time format
//         },
//         {
//             id: 2,
//             restaurantName: 'Mcdonalds',
//             content: 'Your order has been successfully placed. You will get your order as soon as possible.',
//             time: new Date(Date.now() + 7 * 60 * 1000).toISOString(), // Replace with your desired time format
//         },
//         {
//             id: 3,
//             restaurantName: 'Crazy Bites',
//             content: 'Your order has been successfully placed. You will get your order as soon as possible.',
//             time: new Date(Date.now() + 8 * 60 * 1000).toISOString(), // Replace with your desired time format
//         },
//         {
//             id: 4,
//             restaurantName: 'Cheezious',
//             content: 'Your order has been successfully placed. You will get your order as soon as possible.',
//             time: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // Replace with your desired time format
//         },
//         {
//             id: 5,
//             restaurantName: 'Leo Cafe',
//             content: 'Your order has been successfully placed. You will get your order as soon as possible.',
//             time: new Date(Date.now() + 40 * 60 * 1000).toISOString(), // Replace with your desired time format
//         },
//         {
//             id: 6,
//             restaurantName: 'Mcdonalds',
//             content: 'Your order has been successfully placed. You will get your order as soon as possible.',
//             time: new Date(Date.now() + 20 * 60 * 1000).toISOString(), // Replace with your desired time format
//         },
//         {
//             id: 7,
//             restaurantName: 'TKR',
//             content: 'Your order has been successfully placed. You will get your order as soon as possible.',
//             time: new Date(Date.now() + 35 * 60 * 1000).toISOString(), // Replace with your desired time format
//         },
//         {
//             id: 8,
//             restaurantName: 'Monal',
//             content: 'Your order has been successfully placed. You will get your order as soon as possible.',
//             time: new Date(Date.now() + 55 * 60 * 1000).toISOString(), // Replace with your desired time format
//         },
//         {
//             id: 9,
//             restaurantName: 'Cheezious',
//             content: 'Your order has been successfully placed. You will get your order as soon as possible.',
//             time: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // Replace with your desired time format
//         },
        
//     ]);

//     const [selectedNotification, setSelectedNotification] = useState(null);
//     const [isModalVisible, setModalVisible] = useState(false);

//     const updateRemainingTime = () => {
//         const updatedNotifications = notifications.map((notification) => {
//             const currentTime = new Date();
//             const notificationTime = new Date(notification.time);
//             const diffInMilliseconds = notificationTime.getTime() - currentTime.getTime();
//             const diffInSeconds = Math.ceil(diffInMilliseconds / 1000);
//             const remainingMinutes = Math.floor(diffInSeconds / 60);
//             const remainingSeconds = diffInSeconds % 60;

//             return {
//                 ...notification,
//                 remainingMinutes: remainingMinutes > 0 ? remainingMinutes : 0,
//                 remainingSeconds: remainingSeconds > 0 ? remainingSeconds : 0,
//             };
//         });

//         setNotifications(updatedNotifications);
//     };

//     useEffect(() => {
//         updateRemainingTime();
//         const interval = setInterval(updateRemainingTime, 1000); // Update every second

//         return () => clearInterval(interval); // Clean up the interval on unmount
//     }, []);

//     const openNotification = (notification) => {
//         setSelectedNotification(notification);
//         setModalVisible(true);
//     };

//     const deleteNotification = (notification) => {
//         setNotifications((prevNotifications) =>
//             prevNotifications.filter((item) => item.id !== notification.id)
//         );
//         setModalVisible(false);
//     };

//     const truncateText = (text, wordLimit) => {
//         const words = text.split(' ');
//         if (words.length > wordLimit) {
//             return words.slice(0, wordLimit).join(' ') + '...'; // Append ellipsis for truncated text
//         }
//         return text;
//     };

//     return (
//         <View style={styles.container}>
//             <Header />
//             <ScrollView>
//                 {notifications.map((notification) => (
//                     <TouchableOpacity
//                         key={notification.id}
//                         style={styles.notificationContainer}
//                         onPress={() => openNotification(notification)}
//                     >
//                         <Text style={styles.notificationTitle}>{notification.restaurantName}</Text>
//                         <Text style={styles.notificationContent}>
//                             {truncateText(notification.content, wordLimit)}
//                         </Text>
//                         <Text style={styles.notificationTime}>
//                             Remaining Time: {notification.remainingMinutes} minutes {notification.remainingSeconds} seconds
//                         </Text>
//                     </TouchableOpacity>
//                 ))}
//             </ScrollView>
//             <Modal visible={isModalVisible} animationType="slide">
//                 <View style={styles.modalContainer}>
//                     {selectedNotification && (
//                         <View>
//                             <Text style={styles.modalTitle}>{selectedNotification.restaurantName}</Text>
//                             <Text style={styles.modalContent}>{selectedNotification.content}</Text>
//                             <Text style={styles.modalTime}>{selectedNotification.time}</Text>
//                             <TouchableOpacity
//                                 style={styles.deleteButton}
//                                 onPress={() => deleteNotification(selectedNotification)}
//                             >
//                                 <Text style={styles.deleteButtonText}>Delete</Text>
//                             </TouchableOpacity>
//                         </View>
//                     )}
//                     <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
//                         <Text style={styles.closeButtonText}>Close</Text>
//                     </TouchableOpacity>
//                 </View>
//             </Modal>
//         </View>
//     );
// };


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//         backgroundColor: '#fff',
//     },
//     notificationContainer: {
//         borderWidth: 1,
//         backgroundColor: 'orange',
//         borderColor: '#ccc',
//         borderRadius: 8,
//         padding: 12,
//         marginBottom: 16,
//     },
//     notificationTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 8,
//         color:'white',
//     },
//     notificationContent: {
//         fontSize: 16,
//         color:'white'
//     },
//     notificationTime: {
//         fontSize: 12,
//         color: 'white',
//         marginTop: 8,
//     },
//     modalContainer: {
//         flex: 1,
//         backgroundColor: '#fff',
//         padding: 16,
//     },
//     modalTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 8,
//     },
//     modalContent: {
//         fontSize: 18,
//         marginBottom: 16,
//     },
//     modalTime: {
//         fontSize: 14,
//         color: 'gray',
//         marginBottom: 16,
//     },
//     deleteButton: {
//         backgroundColor: 'orange',
//         padding: 12,
//         borderRadius: 8,
//         alignItems: 'center',
//         marginLeft:50,
//         marginRight:50,
//     },
//     deleteButtonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
//     closeButton: {
//         backgroundColor: 'orange',
//         padding: 12,
//         borderRadius: 8,
//         alignItems: 'center',
//         marginTop: 16,
//         marginLeft:50,
//         marginRight:50,
//     },
//     closeButtonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
// });

// export default NotificationScreen;
// import React, { useState, useEffect } from 'react';
// import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Modal } from 'react-native';
// import Header from '../Components/Header';

// const NotificationScreen = () => {
//     const wordLimit = 10;
//     const [notifications, setNotifications] = useState([
//         {
//             id: 1,
//             restaurantName: 'KFC',
//             content: 'Your order has been successfully placed. You will get your order as soon as possible.',
//             time: new Date(Date.now() + 1 * 60 * 1000).toISOString(), // Replace with your desired time format
//         },
//         // Add more notifications as needed
//     ]);

//     const [selectedNotification, setSelectedNotification] = useState(null);
//     const [isModalVisible, setModalVisible] = useState(false);

//     const updateRemainingTime = () => {
//         const updatedNotifications = notifications.map((notification) => {
//             const currentTime = new Date();
//             const notificationTime = new Date(notification.time);
//             const diffInMilliseconds = notificationTime.getTime() - currentTime.getTime();
//             const diffInSeconds = Math.ceil(diffInMilliseconds / 1000);
//             const remainingMinutes = Math.floor(diffInSeconds / 60);
//             const remainingSeconds = diffInSeconds % 60;
//             const isTimeUp = remainingMinutes === 0 && remainingSeconds === 0;

//             return {
//                 ...notification,
//                 remainingMinutes: remainingMinutes > 0 ? remainingMinutes : 0,
//                 remainingSeconds: remainingSeconds > 0 ? remainingSeconds : 0,
//                 isTimeUp: isTimeUp,
//             };
//         });

//         setNotifications(updatedNotifications);
//     };

//     useEffect(() => {
//         updateRemainingTime();
//         const interval = setInterval(updateRemainingTime, 1000); // Update every second

//         return () => clearInterval(interval); // Clean up the interval on unmount
//     }, []);

//     const openNotification = (notification) => {
//         setSelectedNotification(notification);
//         setModalVisible(true);
//     };

//     const deleteNotification = (notification) => {
//         setNotifications((prevNotifications) =>
//             prevNotifications.filter((item) => item.id !== notification.id)
//         );
//         setModalVisible(false);
//     };

//     const truncateText = (text, wordLimit) => {
//         const words = text.split(' ');
//         if (words.length > wordLimit) {
//             return words.slice(0, wordLimit).join(' ') + '...'; // Append ellipsis for truncated text
//         }
//         return text;
//     };

//     return (
//         <View style={styles.container}>
//             <Header />
//             <ScrollView>
//                 {notifications.map((notification) => (
//                     <TouchableOpacity
//                         key={notification.id}
//                         style={[
//                             styles.notificationContainer,
//                             notification.isTimeUp && { backgroundColor: 'green',}, // Change background color if time is up
//                         ]}
//                         onPress={() => openNotification(notification)}
//                     >
//                         <Text style={styles.notificationTitle}>{notification.restaurantName}</Text>
//                         <Text style={styles.notificationContent}>
//                             {truncateText(notification.content, wordLimit)}
//                         </Text>
//                         <Text style={styles.notificationTime}>
//                             Remaining Time: {notification.remainingMinutes} minutes {notification.remainingSeconds} seconds
//                         </Text>
//                     </TouchableOpacity>
//                 ))}
//             </ScrollView>
//             <Modal visible={isModalVisible} animationType="slide">
//                 <View style={styles.modalContainer}>
//                     {selectedNotification && (
//                         <View>
//                             <Text style={styles.modalTitle}>{selectedNotification.restaurantName}</Text>
//                             <Text style={styles.modalContent}>{selectedNotification.content}</Text>
//                             <Text style={styles.modalTime}>{selectedNotification.time}</Text>
//                             <TouchableOpacity
//                                 style={styles.deleteButton}
//                                 onPress={() => deleteNotification(selectedNotification)}
//                             >
//                                 <Text style={styles.deleteButtonText}>Delete</Text>
//                             </TouchableOpacity>
//                         </View>
//                     )}
//                     <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
//                         <Text style={styles.closeButtonText}>Close</Text>
//                     </TouchableOpacity>
//                 </View>
//             </Modal>
//         </View>
//     );
// };
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Modal } from 'react-native';
import Header from '../Components/Header';

const NotificationScreen = () => {
    const wordLimit = 10;
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            restaurantName: 'KFC',
            content: 'Your order has been successfully placed. You will get your order as soon as possible.',
            Note:'if Time up you will get feel home delivery',
            time: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // Replace with your desired time format
        },
        {
            id: 2,
            restaurantName: 'Cheezious',
            content: 'Your order has been successfully placed. You will get your order as soon as possible.',
            Note:'if Time up you will get feel home delivery',
            time: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // Replace with your desired time format
        },
        {
            id: 3,
            restaurantName: 'Mcdonalds',
            content: 'Your order has been successfully placed. You will get your order as soon as possible.',
            Note:'if Time up you will get feel home delivery',
            time: new Date(Date.now() + 40 * 60 * 1000).toISOString(), // Replace with your desired time format
        },
        {
            id: 4,
            restaurantName: 'CrazyBite',
            content: 'Your order has been successfully placed. You will get your order as soon as possible.',
            Note:'if Time up you will get feel home delivery',
            time: new Date(Date.now() + 45 * 60 * 1000).toISOString(), // Replace with your desired time format
        },
        {
            id: 5,
            restaurantName: 'TKR',
            content: 'Your order has been successfully placed. You will get your order as soon as possible.',
            Note:'if Time up you will get feel home delivery',
            time: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // Replace with your desired time format
        },
        {
            id: 6,
            restaurantName: 'KFC',
            content: 'Your order has been successfully placed. You will get your order as soon as possible.',
            Note:'if Time up you will get feel home delivery',
            time: new Date(Date.now() + 40 * 60 * 1000).toISOString(), // Replace with your desired time format
        },
        
        {
            id: 7,
            restaurantName: 'Cheezious',
            content: 'Your order has been successfully placed. You will get your order as soon as possible.',
            Note:'if Time up you will get feel home delivery',
            time: new Date(Date.now() + 25 * 60 * 1000).toISOString(), // Replace with your desired time format
        },
    ]);

    const [selectedNotification, setSelectedNotification] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const updateRemainingTime = () => {
        const updatedNotifications = notifications.map((notification) => {
            const currentTime = new Date();
            const notificationTime = new Date(notification.time);
            const diffInMilliseconds = notificationTime.getTime() - currentTime.getTime();
            const diffInSeconds = Math.ceil(diffInMilliseconds / 1000);
            const remainingMinutes = Math.floor(diffInSeconds / 60);
            const remainingSeconds = diffInSeconds % 60;
            const isTimeUp = remainingMinutes === 0 && remainingSeconds === 0;

            let displayTime = '';
            if (isTimeUp) {
                displayTime = 'Time Up';
            } else {
                displayTime = `Remaining Time: ${remainingMinutes} minutes ${remainingSeconds} seconds`;
            }

            return {
                ...notification,
                remainingMinutes: remainingMinutes > 0 ? remainingMinutes : 0,
                remainingSeconds: remainingSeconds > 0 ? remainingSeconds : 0,
                isTimeUp: isTimeUp,
                displayTime: displayTime,
            };
        });

        setNotifications(updatedNotifications);
    };

    useEffect(() => {
        updateRemainingTime();
        const interval = setInterval(updateRemainingTime, 1000); // Update every second

        return () => clearInterval(interval); // Clean up the interval on unmount
    }, []);

    const openNotification = (notification) => {
        setSelectedNotification(notification);
        setModalVisible(true);
    };

    const deleteNotification = (notification) => {
        setNotifications((prevNotifications) =>
            prevNotifications.filter((item) => item.id !== notification.id)
        );
        setModalVisible(false);
    };

    const truncateText = (text, wordLimit) => {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...'; // Append ellipsis for truncated text
        }
        return text;
    };

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView>
                {notifications.map((notification) => (
                    <TouchableOpacity
                        key={notification.id}
                        style={[
                            styles.notificationContainer,
                            notification.isTimeUp && { backgroundColor: 'green' }, // Change background color if time is up
                        ]}
                        onPress={() => openNotification(notification)}
                    >
                        <Text style={styles.notificationTitle}>{notification.restaurantName}</Text>
                        <Text style={styles.notificationContent}>
                            {truncateText(notification.content, wordLimit)}
                        </Text>
                        <Text style={styles.notificationContent}> {notification.Note}</Text>
                        <Text style={styles.notificationTime}>{notification.displayTime}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Modal visible={isModalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    {selectedNotification && (
                        <View>
                            <Text style={styles.modalTitle}>{selectedNotification.restaurantName}</Text>
                            <Text style={styles.modalContent}>{selectedNotification.content}</Text>
                            <Text style={styles.modalContent}>{selectedNotification.Note}</Text>
                            <Text style={styles.modalTime}>{selectedNotification.time}</Text>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => deleteNotification(selectedNotification)}
                            >
                                <Text style={styles.deleteButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    notificationContainer: {
        borderWidth: 1,
        backgroundColor: 'orange',
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    notificationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'white',
    },
    notificationContent: {
        fontSize: 16,
        color: 'white',
    },
    notificationTime: {
        fontSize: 12,
        color: 'white',
        marginTop: 8,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    modalContent: {
        fontSize: 18,
        marginBottom: 16,
    },
    modalTime: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 16,
    },
    deleteButton: {
        backgroundColor: 'orange',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginLeft: 50,
        marginRight: 50,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: 'orange',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
        marginLeft: 50,
        marginRight: 50,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default NotificationScreen;

