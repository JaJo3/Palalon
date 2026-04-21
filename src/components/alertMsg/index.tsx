import React, { FC, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Platform,
} from 'react-native';
import { AlertConfig } from './config';

interface AlertMsgOptions {
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  position?: 'top' | 'bottom' | 'center';
}

let alertCallback: ((config: AlertConfig) => void) | null = null;

// Toast/Alert display component
const AlertMessage: FC = () => {
  const [alerts, setAlerts] = useState<AlertConfig[]>([]);
  const [animatedValues] = useState(new Animated.Value(0));

  const showAlert = useCallback((config: AlertConfig) => {
    const newAlert: AlertConfig = {
      duration: 2500,
      position: 'top',
      ...config,
    };

    setAlerts((prev) => [...prev, newAlert]);

    // Auto dismiss alert
    const timeout = setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a !== newAlert));
    }, newAlert.duration);

    return () => clearTimeout(timeout);
  }, []);

  // Set the global callback for showing alerts
  React.useEffect(() => {
    alertCallback = showAlert;
  }, [showAlert]);

  const showInfo = (message: string, title: string = 'Info') => {
    showAlert({
      title,
      message,
      type: 'info',
      duration: 2000,
      position: 'top',
    });
  };

  const showSuccess = (message: string, title: string = 'Success') => {
    showAlert({
      title,
      message,
      type: 'success',
      duration: 2000,
      position: 'top',
    });
  };

  const showError = (message: string, title: string = 'Error') => {
    showAlert({
      title,
      message,
      type: 'error',
      duration: 3000,
      position: 'top',
    });
  };

  const showWarning = (message: string, title: string = 'Warning') => {
    showAlert({
      title,
      message,
      type: 'warning',
      duration: 2500,
      position: 'top',
    });
  };

  const getColorByType = (type: string) => {
    switch (type) {
      case 'success':
        return '#10b981';
      case 'error':
        return '#ef4444';
      case 'warning':
        return '#f59e0b';
      case 'info':
      default:
        return '#3b82f6';
    }
  };

  const getIconByType = (type: string) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  return (
    <>
      {alerts.map((alert, index) => (
        <Animated.View
          key={index}
          style={[
            styles.alertContainer,
            alert.position === 'bottom'
              ? styles.bottomPosition
              : styles.topPosition,
          ]}
        >
          <View
            style={[
              styles.alertBox,
              {
                borderLeftColor: getColorByType(alert.type),
                backgroundColor: getColorByType(alert.type) + '15',
              },
            ]}
          >
            <View style={styles.iconContainer}>
              <Text
                style={[
                  styles.icon,
                  { color: getColorByType(alert.type) },
                ]}
              >
                {getIconByType(alert.type)}
              </Text>
            </View>

            <View style={styles.contentContainer}>
              <Text
                style={[
                  styles.title,
                  { color: getColorByType(alert.type) },
                ]}
              >
                {alert.title}
              </Text>
              <Text style={styles.message}>{alert.message}</Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setAlerts((prev) =>
                  prev.filter((a) => a !== alert)
                );
              }}
              style={styles.closeButton}
            >
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      ))}
    </>
  );
};

// Global alert functions
export const showAlertMsg = (config: AlertConfig) => {
  if (alertCallback) {
    alertCallback(config);
  }
};

export const showInfo = (message: string, title: string = 'Info') => {
  showAlertMsg({
    title,
    message,
    type: 'info',
    duration: 2000,
    position: 'top',
  });
};

export const showSuccess = (message: string, title: string = 'Success') => {
  showAlertMsg({
    title,
    message,
    type: 'success',
    duration: 2000,
    position: 'top',
  });
};

export const showError = (message: string, title: string = 'Error') => {
  showAlertMsg({
    title,
    message,
    type: 'error',
    duration: 3000,
    position: 'top',
  });
};

export const showWarning = (message: string, title: string = 'Warning') => {
  showAlertMsg({
    title,
    message,
    type: 'warning',
    duration: 2500,
    position: 'top',
  });
};

const styles = StyleSheet.create({
  alertContainer: {
    position: 'absolute',
    left: 10,
    right: 10,
    zIndex: 1000,
  },
  topPosition: {
    top: Platform.OS === 'android' ? 50 : 80,
  },
  bottomPosition: {
    bottom: 30,
  },
  alertBox: {
    flexDirection: 'row',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  message: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  closeButton: {
    padding: 8,
    marginLeft: 8,
  },
  closeIcon: {
    fontSize: 18,
    color: '#999',
    fontWeight: 'bold',
  },
});

export default AlertMessage;
